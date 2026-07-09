import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import Event from '@/database/event.model'

export async function POST(req:NextRequest){
    try{
        await connectDB();

        const formData = await req.formData()

        let event
        try{
            event = Object.fromEntries(formData.entries())
                   }
        catch (e){
            return NextResponse.json({message:'invalid JSON data format'},{status:400})
        }

        const file = formData.get('image')as File
        if(!file) return NextResponse.json({message:'Image file is required'},{status:400})

        const tags = JSON.parse(formData.get('tags') as string)
        const agenda = JSON.parse(formData.get('agenda') as string)
        const createEvent = await Event.create({...event,
        tags:tags,
        agenda:agenda})
        return NextResponse.json({message:"Event is created successfully",event:createEvent},{status:201})
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({message:"Event Creation Failed",error: e instanceof Error ? e.message : "Unknown"},{status:500})
    }
}

export async function GET(){
    try{
        await connectDB();

        const events = await Event.find().sort({createdAt:-1})
        return NextResponse.json({message:"Events fetched successfully",events:events},{status:200})
    }
    catch (e){
        return NextResponse.json({message:"unable to fetch Event ",error:e},{status:500})
    }
}