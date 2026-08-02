'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Link
      href={`/events/${slug}`}
      id="event-card"
      onClick={() => setIsClicked(true)}
      className={`transition-all duration-200 block group active:scale-[0.98] ${
        isClicked ? "opacity-75" : ""
      }`}
    >
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="poster group-hover:scale-105 transition-transform duration-300 object-cover"
        />
        {isClicked && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="w-6 h-6 border-2 border-[#59deca] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-3">
        <Image src={"/icons/pin.svg"} alt={"location"} width={14} height={14} />
        <p>{location}</p>
      </div>

      <p className={"title group-hover:text-[#59deca] transition-colors"}>{title}</p>

      <div className="datetime">
        <div>
          <Image src={"/icons/calendar.svg"} alt={"date"} width={14} height={14} />
          <p>{date}</p>
        </div>
        <div>
          <Image src={"/icons/clock.svg"} alt={"time"} width={14} height={14} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
