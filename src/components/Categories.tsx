"use client";

import { Utensils, MapPin, Bike, Music, Ticket, Heart, BedDouble, Camera } from "lucide-react";
import Image from "next/image";

const categories = [
  {
    title: "RESTAURANTS",
    icon: <Utensils className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
    image: "/cat_restaurants.jpg",
    items: ["Fine Dining", "Hidden Gems", "Chef's Tables", "Farm-to-Table", "Brunch Experiences"],
  },
  {
    title: "EXPERIENCES",
    icon: <MapPin className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
    image: "/cat_experiences.jpg",
    items: ["Vineyards", "Nature Trails", "Photography Walks", "Camping", "Adventure & More"],
  },
  {
    title: "ACTIVITIES",
    icon: <Bike className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
    image: "/cat_activities.jpg",
    items: ["Go Karting", "ATV Rides", "Horse Riding", "Kayaking", "Archery & More"],
  },
  {
    title: "CLUBS",
    icon: <Music className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
    image: "/cat_clubs.jpg",
    items: ["Supper Clubs", "Wine Clubs", "Book Clubs", "Automobile Clubs", "Travel Communities"],
  },
  {
    title: "EVENTS",
    icon: <Ticket className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
    image: "/cat_events.jpg",
    items: ["Live Music", "Art Exhibitions", "Food Festivals", "Pop Ups", "Private Events"],
  },
  {
    title: "WELLNESS",
    icon: <Heart className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
    image: "/cat_wellness.jpg",
    items: ["Yoga Retreats", "Spa & Healing", "Breathwork", "Meditation", "Wellness Stays"],
  },
  {
    title: "STAYS",
    icon: <BedDouble className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
    image: "/cat_stays.jpg",
    items: ["Boutique Hotels", "Luxury Villas", "Glamping", "Farm Stays", "Heritage Homes"],
  },
  {
    title: "CREATORS",
    icon: <Camera className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
    image: "/cat_creators.jpg",
    items: ["Chefs", "Artists", "Musicians", "Photographers", "Storytellers"],
  },
];

export default function Categories() {
  return (
    <section className="bg-[#080806] py-20 lg:py-28 border-b border-white/[0.06] relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#8A857D]" />
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#A6A196] uppercase font-semibold">
              CURATED SECTORS
            </span>
            <span className="w-8 h-[1px] bg-[#8A857D]" />
          </div>

          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF8F5] mb-6 leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
          >
            What You Can Host <br />
            <span className="text-[#C5B499] italic">On La Vivenzia</span>
          </h1>

          <p className="text-sm font-sans font-light text-[#A8A398] leading-relaxed">
            From secluded private villas to immersive culinary experiences, we curate Maharashtra&apos;s most extraordinary destinations for our distinguished members.
          </p>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group bg-[#100F0C] border border-white/[0.08] hover:border-[#D7AE63]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              {/* Image Header */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100F0C] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
                  {cat.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 
                  className="text-xl font-normal text-[#FAF8F5] tracking-wide mb-3"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  {cat.title}
                </h3>
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li key={item} className="text-xs font-sans font-light text-[#9E988D] flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#D7AE63]/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
