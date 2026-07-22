'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, MapPin, ChevronDown, Upload, Tag, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { createEventAction } from '@/lib/actions/events.actions';

export default function CreateEventForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [mode, setMode] = useState<'online' | 'offline' | 'hybrid'>('online');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['react', 'next', 'js']);
  const [description, setDescription] = useState('');

  // Handle image upload / URL selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setImage(val);
    if (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('data:')) {
      setImagePreview(val);
    } else {
      setImagePreview(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Tag helper
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/^#/, '');
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validation
    if (!title.trim()) {
      setErrorMsg('Event title is required.');
      return;
    }
    if (!date) {
      setErrorMsg('Event date is required.');
      return;
    }
    if (!time) {
      setErrorMsg('Event start time is required.');
      return;
    }
    if (!location.trim()) {
      setErrorMsg('Venue or online link is required.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Event description is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Default image if none provided
      const finalImage = image.trim() || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop';
      const finalTags = tags.length > 0 ? tags : ['tech', 'event'];

      const res = await createEventAction({
        title,
        date,
        time,
        location,
        mode,
        image: finalImage,
        tags: finalTags,
        description,
        overview: description,
        audience: 'Developers & Tech Enthusiasts',
        organizer: 'DevEvent Community',
        agenda: ['Welcome & Introduction', 'Main Presentation', 'Interactive Q&A Session'],
      });

      if (res.success && res.event) {
        setSuccessMsg('Event created successfully! Redirecting...');
        setTimeout(() => {
          router.push(`/events/${res.event.slug}`);
        }, 1200);
      } else {
        setErrorMsg(res.error || 'Failed to create event. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[640px] mx-auto bg-[#0D161A] border border-[#182830] rounded-2xl p-6 sm:p-10 card-shadow space-y-6"
    >
      {/* Error Alert */}
      {errorMsg && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Success Alert */}
      {successMsg && (
        <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 1. Event Title */}
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-white">
          Event Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter event title"
          className="w-full bg-[#182830] border border-[#243B47] text-white placeholder-[#566A75] rounded-lg px-4 py-3 focus:outline-none focus:border-[#59DECA] focus:ring-1 focus:ring-[#59DECA] transition-all text-sm sm:text-base"
        />
      </div>

      {/* 2. Event Date */}
      <div className="space-y-2">
        <label htmlFor="date" className="block text-sm font-medium text-white">
          Event Date
        </label>
        <div className="relative">
          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#566A75] pointer-events-none" />
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-[#182830] border border-[#243B47] text-white placeholder-[#566A75] rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-[#59DECA] focus:ring-1 focus:ring-[#59DECA] transition-all text-sm sm:text-base color-scheme-dark"
          />
        </div>
      </div>

      {/* 3. Event Time */}
      <div className="space-y-2">
        <label htmlFor="time" className="block text-sm font-medium text-white">
          Event Time
        </label>
        <div className="relative">
          <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#566A75] pointer-events-none" />
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-[#182830] border border-[#243B47] text-white placeholder-[#566A75] rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-[#59DECA] focus:ring-1 focus:ring-[#59DECA] transition-all text-sm sm:text-base color-scheme-dark"
          />
        </div>
      </div>

      {/* 4. Event Location / Venue */}
      <div className="space-y-2">
        <label htmlFor="location" className="block text-sm font-medium text-white">
          Event Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#566A75] pointer-events-none" />
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter venue or online link"
            className="w-full bg-[#182830] border border-[#243B47] text-white placeholder-[#566A75] rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-[#59DECA] focus:ring-1 focus:ring-[#59DECA] transition-all text-sm sm:text-base"
          />
        </div>
      </div>

      {/* 5. Event Type */}
      <div className="space-y-2">
        <label htmlFor="mode" className="block text-sm font-medium text-white">
          Event Type
        </label>
        <div className="relative">
          <select
            id="mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as any)}
            className="w-full bg-[#182830] border border-[#243B47] text-white rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:border-[#59DECA] focus:ring-1 focus:ring-[#59DECA] transition-all text-sm sm:text-base cursor-pointer"
          >
            <option value="online" className="bg-[#182830] text-white">
              Online
            </option>
            <option value="offline" className="bg-[#182830] text-white">
              Offline
            </option>
            <option value="hybrid" className="bg-[#182830] text-white">
              Hybrid
            </option>
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#566A75] pointer-events-none" />
        </div>
      </div>

      {/* 6. Event Image / Banner */}
      <div className="space-y-2">
        <label htmlFor="image" className="block text-sm font-medium text-white">
          Event Image / Banner
        </label>
        <div className="space-y-3">
          <div className="relative">
            <input
              id="image"
              type="text"
              value={image}
              onChange={handleImageChange}
              placeholder="Upload event image or paste image URL"
              className="w-full bg-[#182830] border border-[#243B47] text-white placeholder-[#566A75] rounded-lg pl-11 pr-24 py-3 focus:outline-none focus:border-[#59DECA] focus:ring-1 focus:ring-[#59DECA] transition-all text-sm sm:text-base truncate"
            />
            <Upload className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#566A75] pointer-events-none" />
            <label
              htmlFor="file-upload"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#243B47] hover:bg-[#2d4957] text-[#DCFFF8] text-xs font-medium px-3 py-1.5 rounded cursor-pointer transition-colors"
            >
              Browse
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {imagePreview && (
            <div className="relative w-full h-40 rounded-lg overflow-hidden border border-[#243B47] bg-[#182830]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="Banner Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => {
                  setImage('');
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white text-xs px-2 py-1 rounded backdrop-blur-sm transition-all"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 7. Tags */}
      <div className="space-y-2">
        <label htmlFor="tags" className="block text-sm font-medium text-white">
          Tags
        </label>
        <div className="space-y-3">
          <div className="relative">
            <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#566A75] pointer-events-none" />
            <input
              id="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add tags such as react, next, js (press Enter)"
              className="w-full bg-[#182830] border border-[#243B47] text-white placeholder-[#566A75] rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-[#59DECA] focus:ring-1 focus:ring-[#59DECA] transition-all text-sm sm:text-base"
            />
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 bg-[#182830] border border-[#243B47] text-[#DCFFF8] text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-400 font-bold transition-colors ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 8. Event Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-white">
          Event Description
        </label>
        <div className="relative">
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe the event"
            className="w-full bg-[#182830] border border-[#243B47] text-white placeholder-[#566A75] rounded-lg p-4 focus:outline-none focus:border-[#59DECA] focus:ring-1 focus:ring-[#59DECA] transition-all text-sm sm:text-base resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#59DECA] hover:bg-[#4ed0bc] text-black font-bold text-base sm:text-lg rounded-lg py-3.5 sm:py-4 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#59DECA]/20 active:scale-[0.99]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Saving Event...</span>
            </>
          ) : (
            <span>Save Event</span>
          )}
        </button>
      </div>
    </form>
  );
}
