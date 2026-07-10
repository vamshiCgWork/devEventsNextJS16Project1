'use server'

import {connectDB} from "@/lib/mongodb";
import Event from "@/database/event.model"

export const getEventBySlug = async (slug:string)=>{

    if(!slug || typeof slug !== "string" || !slug.trim()){
        throw new Error("Missing or invalid slug");
    }

    await connectDB()
    const event = await Event.findOne({slug:slug.trim()}).lean().exec()

    if (!event){
        throw new Error("Event not found")
    }
    return event
}

export const getSimilarEventsBySlug = async (slug:string)=>{
    try {
        await connectDB()
        const event = await Event.findOne({slug})
        return  await Event.find({_id:{$ne:event._id}, tags:{$in:event.tags}}).lean().exec()

    }
    catch (error){
        return []
    }
}