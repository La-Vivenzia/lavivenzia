import { Utensils, MapPin, Bike, Music, Ticket, Heart, BedDouble, Camera } from "lucide-react";

const categories = [
  {
    title: "RESTAURANTS",
    icon: <Utensils className="w-7 h-7 mb-3 text-[var(--color-gold-light)]" strokeWidth={1.5} />,
    image: "/cat_restaurants.jpg",
    items: ["Fine Dining", "Hidden Gems", "Chef's Tables", "Farm-to-Table", "Brunch Experiences"],
  },
  {
    title: "EXPERIENCES",
    icon: <MapPin className="w-7 h-7 mb-3 text-[var(--color-gold-light)]" strokeWidth={1.5} />,
    image: "/cat_experiences.jpg",
    items: ["Vineyards", "Nature Trails", "Photography Walks", "Camping", "Adventure & More"],
  },
  {
    title: "ACTIVITIES",
    icon: <Bike className="w-7 h-7 mb-3 text-[var(--color-gold-light)]" strokeWidth={1.5} />,
    image: "/cat_activities.jpg",
    items: ["Go Karting", "ATV Rides", "Horse Riding", "Kayaking", "Archery & More"],
  },
  {
    title: "CLUBS",
    icon: <Music className="w-7 h-7 mb-3 text-[var(--color-gold-light)]" strokeWidth={1.5} />,
    image: "/cat_clubs.jpg",
    items: ["Supper Clubs", "Wine Clubs", "Book Clubs", "Automobile Clubs", "Travel Communities"],
  },
  {
    title: "EVENTS",
    icon: <Ticket className="w-7 h-7 mb-3 text-[var(--color-gold-light)]" strokeWidth={1.5} />,
    image: "/cat_events.jpg",
    items: ["Live Music", "Art Exhibitions", "Food Festivals", "Pop Ups", "Private Events"],
  },
  {
    title: "WELLNESS",
    icon: <Heart className="w-7 h-7 mb-3 text-[var(--color-gold-light)]" strokeWidth={1.5} />,
    image: "/cat_wellness.jpg",
    items: ["Yoga Retreats", "Spa & Healing", "Breathwork", "Meditation", "Wellness Stays"],
  },
  {
    title: "STAYS",
    icon: <BedDouble className="w-7 h-7 mb-3 text-[var(--color-gold-light)]" strokeWidth={1.5} />,
    image: "/cat_stays.jpg",
    items: ["Boutique Hotels", "Luxury Villas", "Glamping", "Farm Stays", "Heritage Homes"],
  },
  {
    title: "CREATORS",
    icon: <Camera className="w-7 h-7 mb-3 text-[var(--color-gold-light)]" strokeWidth={1.5} />,
    image: "/cat_creators.jpg",
    items: ["Chefs", "Artists", "Musicians", "Photographers", "Storytellers"],
  },
];

export default function Categories() {
  return (
    <section className="bg-[var(--color-background)] py-16 lg:py-24 border-b border-[var(--color-border-subtle)] relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4 opacity-70">
            <div className="w-12 h-[1px] bg-[var(--color-gold-muted)]" />
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 0L10 5L5 10L0 5L5 0Z" fill="var(--color-gold-primary)"/>
            </svg>
            <div className="w-12 h-[1px] bg-[var(--color-gold-muted)]" />
          </div>
          <p className="text-[var(--color-gold-primary)] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3 font-sans">
            WHO CAN JOIN?
          </p>
          <h2 className="font-serif font-medium text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ivory)] leading-tight uppercase">
            We Welcome Experience Creators<br />
            <span className="text-gradient-gold">Across Categories</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="relative group overflow-hidden border border-[var(--color-border-subtle)] hover:border-[var(--color-border-gold)] transition-colors duration-500 h-[380px] sm:h-[400px] rounded-sm"
            >
              {/* Full Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-105"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              {/* Heavy Gradient overlay to blend image and make text readable */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#080806]/50 via-[#0D0C09]/85 to-[#080806]" />
              <div className="absolute inset-0 mix-blend-color bg-[var(--color-gold-muted)] opacity-20" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                <div className="flex flex-col items-center border-b border-[var(--color-border-subtle)] pb-4 mb-4">
                  {cat.icon}
                  <h3 className="text-[var(--color-gold-primary)] text-sm sm:text-base font-serif font-semibold tracking-[0.2em] uppercase text-center">
                    {cat.title}
                  </h3>
                </div>
                <ul className="space-y-2 text-center">
                  {cat.items.map((item, i) => (
                    <li key={i} className="text-xs sm:text-sm text-[var(--color-body-text)] font-light tracking-wide font-sans">
                      <span className="text-[var(--color-gold-primary)] mr-2 opacity-70">•</span>{item}
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
