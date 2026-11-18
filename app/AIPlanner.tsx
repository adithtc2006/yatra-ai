"use client";

import { useState } from "react";

export default function AIPlanner() {
  const [days, setDays] = useState("2");
  const [budget, setBudget] = useState("Moderate");
  const [interests, setInterests] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);
  const [itinerary, setItinerary] = useState<
  { day: number; places: string[] }[]
>([]);
const [routeDetails, setRouteDetails] = useState<
  Record<number, { distance: number; duration: number }>
>({});
const [routeLegDurations, setRouteLegDurations] = useState<
  Record<number, number[]>
>({});

  const options = [
    "Historical Places",
    "Food",
    "Shopping",
    "Adventure",
    "Nature",
    "Photography",
  ];type Destination = {
  name: string;
  category: string;
  budget: string;
  visitDuration?: number;
  coordinates: [number, number];
};const destinations: Destination[] = [
  {
  name: "India Gate",
  category: "Historical Places",
  budget: "Budget Friendly",
  visitDuration: 45,
  coordinates: [28.6129, 77.2295],
},
  {
  name: "Red Fort",
  category: "Historical Places",
  budget: "Moderate",
  visitDuration: 120,
  coordinates: [28.655880, 77.238650],
},
  {
    name: "Humayun's Tomb",
    category: "Historical Places",
    budget: "Moderate",
    visitDuration: 90,
    coordinates: [28.5933, 77.2507],
  },
  {
    name: "Qutub Minar",
    category: "Historical Places",
    budget: "Moderate",
    visitDuration: 90,
    coordinates: [28.5245, 77.1855],
  },
  {
    name: "Chandni Chowk",
    category: "Food",
    budget: "Budget Friendly",
    visitDuration: 90,
    coordinates: [28.6506, 77.2303],
  },
  {
    name: "Connaught Place",
    category: "Shopping",
    budget: "Luxury",
    visitDuration: 90,
    coordinates: [28.6315, 77.2167],
  },
  {
    name: "Lodhi Garden",
    category: "Nature",
    budget: "Budget Friendly",
    visitDuration: 60,
    coordinates: [28.5931, 77.2197],
  },
  {
    name: "Dilli Haat",
    category: "Shopping",
    budget: "Moderate",
    visitDuration: 90,
    coordinates: [28.5733, 77.2075],
  },
  {
    name: "National Gallery of Modern Art",
    category: "Photography",
    budget: "Moderate",
    visitDuration: 90,
    coordinates: [28.6094, 77.2341],
  },
  {
    name: "Adventure Island",
    category: "Adventure",
    budget: "Luxury",
    visitDuration: 180,
    coordinates: [28.7244, 77.1138],
  },
];
function calculateDistance(
  coord1: number[],
  coord2: number[]
): number {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const lat1 = coord1[0];
  const lon1 = coord1[1];
  const lat2 = coord2[0];
  const lon2 = coord2[1];

  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
  function toggleInterest(item: string) {
    function calculateDistance(
  coord1: number[],
  coord2: number[]
) {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const lat1 = coord1[0];
  const lon1 = coord1[1];
  const lat2 = coord2[0];
  const lon2 = coord2[1];

  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
    setInterests((previous) =>
      previous.includes(item)
        ? previous.filter((interest) => interest !== item)
        : [...previous, item]
    );
  }

 function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (interests.length === 0) {
    alert("Please select at least one interest!");
    return;
  }

  const budgetLevels: Record<string, number> = {
    "Budget Friendly": 1,
    "Moderate": 2,
    "Luxury": 3,
  };

  // Select destinations based on interests and budget
  let selectedPlaces = destinations.filter(
    (place) =>
      interests.includes(place.category) &&
      budgetLevels[place.budget] <= budgetLevels[budget]
  );

  // If no destinations match the budget, use interest matches
  if (selectedPlaces.length === 0) {
    selectedPlaces = destinations.filter((place) =>
      interests.includes(place.category)
    );
  }
  // Sort destinations by geographical proximity

const sortedPlaces = [...selectedPlaces];

if (sortedPlaces.length > 1) {
  const optimizedPlaces = [sortedPlaces.shift()!];

  while (sortedPlaces.length > 0) {
    const lastPlace = optimizedPlaces[optimizedPlaces.length - 1];

    sortedPlaces.sort((a, b) => {
      const distanceA = calculateDistance(
  [...lastPlace.coordinates],
  [...a.coordinates]
);

const distanceB = calculateDistance(
  [...lastPlace.coordinates],
  [...b.coordinates]
);
      return distanceA - distanceB;
    });

    optimizedPlaces.push(sortedPlaces.shift()!);
  }

  selectedPlaces = optimizedPlaces;
}

 // Smart destination grouping based on geographical proximity

const remainingPlaces = [...selectedPlaces];
const dailyPlan: { day: number; places: string[] }[] = [];

for (let i = 0; i < Number(days); i++) {
  if (remainingPlaces.length === 0) break;

  const dayPlaces = remainingPlaces.splice(
    0,
    Math.ceil(remainingPlaces.length / (Number(days) - i))
  );

  dailyPlan.push({
    day: i + 1,
    places: dayPlaces.map((place) => place.name),
  });
}

setItinerary(dailyPlan);
setRouteDetails({});
setGenerated(true);
}
function getDailySchedule(day: { day: number; places: string[] }) {
  let currentMinutes = 9 * 60; // Start at 9:00 AM

  return day.places.map((placeName, index) => {
    const destination = destinations.find(
      (item) => item.name === placeName
    );

    const duration = destination?.visitDuration ?? 60;

    const travelTimes = routeLegDurations[day.day] ?? [];

let travelDuration = 0;

if (day.places.length === 1 && index === 0) {
  travelDuration = travelTimes[0] ?? 30;
} else if (index > 0) {
  travelDuration = travelTimes[index - 1] ?? 30;
}

currentMinutes += travelDuration;

    const arrival = currentMinutes;
    const departure = arrival + duration;

    currentMinutes = departure;

    const formatTime = (minutes: number) => {
  const roundedMinutes = Math.round(minutes);
  const hours = Math.floor(roundedMinutes / 60);
  const mins = roundedMinutes % 60;
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;

      return `${displayHours}:${String(mins).padStart(2, "0")} ${period}`;
    };

    return {
      place: placeName,
      arrival: formatTime(arrival),
      departure: formatTime(departure),
      duration,
    };
  });
}
async function calculateTravelDetails() {
  try {
    const updatedDetails: Record<
      number,
      { distance: number; duration: number }
    > = {};const updatedLegDurations: Record<number, number[]> = {};

    for (const day of itinerary) {
      console.log("CALCULATING DAY:", day.day);
console.log("PLACES FOR THIS DAY:", day.places);
      if (day.places.length === 0) continue;

const placesToRoute =
  day.places.length === 1
    ? ["Connaught Place", ...day.places]
    : day.places;
      const coordinates: [number, number][] = placesToRoute.map(
  (placeName) => {
    const destination = destinations.find(
      (item) => item.name === placeName
    );

    if (!destination) {
      throw new Error(`Coordinates not found for ${placeName}`);
    }

    console.log(
      "DESTINATION:",
      placeName,
      destination.coordinates
    );

    return [
      destination.coordinates[1],
      destination.coordinates[0],
    ];
  }
);

console.log("PLACES:", day.places);
console.log("COORDINATES:", coordinates);

      const response = await fetch("/api/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates,
          profile: "driving-car",
        }),
      });

      const data = await response.json();

      console.log("ROUTE API STATUS:", response.status);
      console.log("ROUTE API RESPONSE:", data);

      if (!response.ok || !data.features?.[0]) {
        throw new Error(
          `Route API Error: ${JSON.stringify(data)}`
        );
      }

     const properties = data.features[0].properties;
const summary = properties.summary;
console.log("ROUTE SEGMENTS FOR DAY", day.day, properties.segments);

updatedDetails[day.day] = {
  distance: summary.distance / 1000,
  duration: summary.duration / 60,
};

// Store actual travel time between consecutive destinations
updatedLegDurations[day.day] = (
  properties.segments ?? []
).map((segment: { duration: number }) => segment.duration / 60);
    }

    setRouteDetails(updatedDetails);
    setRouteLegDurations(updatedLegDurations);
  } catch (error) {
    console.error("Travel calculation error:", error);
    alert("Unable to calculate travel details. Please try again.");
  }
}

  return (
    <section id="planner" className="px-6 md:px-20 pb-24">
      <div className="bg-[#183b32] rounded-3xl p-8 md:p-16 text-white">

        <div className="text-center">
          <p className="text-[#e9c68d] uppercase tracking-[4px] text-xs">
            Your Personal Travel Assistant
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-5">
            Let AI Plan Your Delhi Journey.
          </h2>

          <p className="text-gray-300 max-w-xl mx-auto mt-6 leading-7">
            Tell us your preferences and let YATRA AI help
            you discover the best of Delhi.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-12">

          <label className="block mb-3 font-semibold">
            How many days are you planning?
          </label>

          <select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full p-4 rounded-xl bg-white text-gray-800 mb-7"
          >
            <option value="1">1 Day</option>
            <option value="2">2 Days</option>
            <option value="3">3 Days</option>
            <option value="4">4 Days</option>
            <option value="5">5 Days</option>
          </select>

          <label className="block mb-3 font-semibold">
            What is your approximate budget?
          </label>

          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-4 rounded-xl bg-white text-gray-800 mb-7"
          >
            <option>Budget Friendly</option>
            <option>Moderate</option>
            <option>Luxury</option>
          </select>

          <label className="block mb-4 font-semibold">
            What are you interested in?
          </label>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {options.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setInterests((prev) =>
                    prev.includes(item)
                      ? prev.filter((interest) => interest !== item)
                      : [...prev, item]
                  );
                }}
                className={`p-3 rounded-xl border ${
                  interests.includes(item)
                    ? "bg-[#183b32] text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-9 bg-[#d2a45e] text-[#183b32] py-4 rounded-full font-bold hover:bg-[#e9c68d] transition"
          >
            Generate My Delhi Trip →
          </button>

        </form>

       {generated && (
  <div className="max-w-3xl mx-auto mt-12">

    <h3 className="text-3xl font-bold text-[#e9c68d] text-center mb-8">
      Your Personalized Delhi Itinerary
    </h3>
    <button
  onClick={() => {
  console.log("TRAVEL BUTTON CLICKED!");
  calculateTravelDetails();
}}
  className="block mx-auto mb-8 bg-[#d2a45e] text-[#183b32] px-8 py-4 rounded-full font-bold hover:bg-[#e9c68d] transition"
>
  Calculate Travel Distance & Time →
</button>

    <div className="grid gap-6">

      {itinerary.map((day) => (
        <div
          key={day.day}
          className="bg-white/10 border border-white/20 rounded-2xl p-6"
        >
          <h4 className="text-2xl font-bold text-[#e9c68d] mb-4">
            Day {day.day}
          </h4>

          {day.places.length > 0 ? (
            <>
            <ul className="space-y-3">
              {day.places.map((place, index) => (
                <li key={place} className="flex items-center gap-3">
                  <span className="bg-[#d2a45e] text-[#183b32] w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>

                  <a
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place + ", Delhi, India")}`}
  target="_blank"
  rel="noopener noreferrer"
  className="text-lg hover:text-[#e9c68d] underline underline-offset-4 transition"
>
  {place} ↗
</a>
                </li>
              ))}
            </ul>
            <div className="mt-5 p-5 rounded-xl bg-white/10">
  <h5 className="text-[#e9c68d] font-bold text-lg mb-4">
    🕒 Suggested Visit Schedule
  </h5>

  <div className="space-y-4">
    {getDailySchedule(day).map((schedule, index) => (
      <div
        key={index}
        className="border-l-2 border-[#d2a45e] pl-4"
      >
        <p className="font-semibold text-white">
          {schedule.place}
        </p>

        <p className="text-gray-300 text-sm mt-1">
          Arrival: {schedule.arrival}
        </p>

        <p className="text-gray-300 text-sm">
          Departure: {schedule.departure}
        </p>

        <p className="text-[#e9c68d] text-sm">
          Visit duration: {schedule.duration} minutes
        </p>
      </div>
    ))}
  </div>
</div>
            {routeDetails[day.day] && (
  <div className="mt-5 p-4 rounded-xl bg-white/10">
    <p className="text-[#e9c68d] font-semibold">
      🚗 Travel Information
    </p>

    <p className="mt-2">
      Total Distance: {routeDetails[day.day].distance.toFixed(2)} km
    </p>

    <p className="mt-1">
      Estimated Travel Time:{" "}
      {Math.round(routeDetails[day.day].duration)} minutes
    </p>
  </div>
)}
            </>
          ) : (
            <p className="text-gray-300">
              Explore nearby attractions and enjoy your day!
            </p>
          )}
        </div>
      ))}

    </div>

    <p className="text-center text-gray-300 mt-8">
      Your trip is planned with YATRA AI.
    </p>

  </div>
)}

      </div>
    </section>
  );
}