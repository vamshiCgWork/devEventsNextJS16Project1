import React from 'react';
import type { Metadata } from 'next';
import CreateEventForm from '@/components/CreateEventForm';

export const metadata: Metadata = {
  title: 'Create an Event - DevEvents',
  description: 'Host and publish your developer meetup, hackathon, or conference.',
};

export default function CreateEventPage() {
  return (
    <section className="flex flex-col items-center justify-center py-6 sm:py-10 space-y-8 sm:space-y-10 w-full">
      <h1 className="text-center text-4xl sm:text-6xl font-bold tracking-tight">
        Create an Event
      </h1>
      <CreateEventForm />
    </section>
  );
}
