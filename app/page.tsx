import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { Event, type IEvent } from "@/database";
import { connectDB } from "@/lib/mongodb";
//import {events} from "@/lib/constants";


export const dynamic = 'force-dynamic';

const Page = async () => {

    // Load events directly from the database during server-side rendering.
    // Calling internal API routes during `next build` can fail (ECONNREFUSED) because
    // the serverless dev server is not running. Querying the DB here avoids that.
    let events: IEvent[] = [];
    try {
      await connectDB();
      events = (await Event.find().lean().exec()) as IEvent[];
    } catch (err) {
      // Log and continue with empty events to allow prerender to succeed
      // (alternatively surface an error page if desired)
      // eslint-disable-next-line no-console
      console.error("Failed to load events for page:", err);
    }

    return (
        <section>
            <h1 className="text-center">
              The Hub for Every Dev <br/> Event you Can't Miss
            </h1>
            <p className="text-center mt-5">Hackathons, Meetups and Conferences, All at One Place</p>
            <ExploreBtn/>
            <div className={"mt-20 space-y-7"}>
                <h3>Featured Events</h3>
                <ul className="events">{events && events.length>0 && events.map((event:IEvent)=>(
                  <li key={event.title} className={'list-none'}>
                    <EventCard {...event} />
                  </li>
                ))}</ul>
            </div>
        </section>
    )
}
export default Page
