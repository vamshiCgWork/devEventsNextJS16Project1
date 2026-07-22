"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteEventAction } from "@/lib/actions/events.actions";

interface Props {
  eventId: string;
  slug: string;
  title: string;
}

export default function EventTableActions({ eventId, slug, title }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setIsDeleting(true);
    try {
      const res = await deleteEventAction(eventId);
      if (!res.success) {
        alert(res.error || "Failed to delete event");
      }
    } catch (err) {
      alert("An unexpected error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/events/${slug}`}
        className="text-[#59deca] hover:underline font-medium text-sm transition-colors"
      >
        Edit
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-white/80 hover:text-red-400 font-medium text-sm cursor-pointer transition-colors disabled:opacity-50"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
