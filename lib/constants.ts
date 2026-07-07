export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "React Conference 2026",
    image: "/images/event1.png",
    slug: "react-conference-2026",
    location: "San Francisco, CA",
    date: "August 15-17, 2026",
    time: "9:00 AM - 5:00 PM",
  },
  {
    title: "NextJS Summit",
    image: "/images/event2.png",
    slug: "nextjs-summit-2026",
    location: "New York, NY",
    date: "September 10-12, 2026",
    time: "10:00 AM - 6:00 PM",
  },
  {
    title: "Web Dev Hackathon 2026",
    image: "/images/event3.png",
    slug: "web-dev-hackathon-2026",
    location: "Austin, TX",
    date: "August 22-24, 2026",
    time: "8:00 AM - 10:00 PM",
  },
  {
    title: "JavaScript Conf Europe",
    image: "/images/event4.png",
    slug: "js-conf-europe-2026",
    location: "Berlin, Germany",
    date: "October 5-7, 2026",
    time: "9:00 AM - 5:30 PM",
  },
  {
    title: "DevOps & Cloud Meetup",
    image: "/images/event5.png",
    slug: "devops-cloud-meetup",
    location: "Seattle, WA",
    date: "August 28, 2026",
    time: "6:00 PM - 9:00 PM",
  },
  {
    title: "AI & Machine Learning Bootcamp",
    image: "/images/event6.png",
    slug: "ai-ml-bootcamp-2026",
    location: "Boston, MA",
    date: "September 20-24, 2026",
    time: "9:00 AM - 4:00 PM",
  },
];
