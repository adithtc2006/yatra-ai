"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const places = [
  {
    name: "India Gate",
    lat: 28.6129,
    lng: 77.2295,
    description: "Famous war memorial in New Delhi.",
  },
  {
    name: "Red Fort",
    lat: 28.6562,
    lng: 77.241,
    description: "Historic Mughal fort.",
  },
  {
    name: "Qutub Minar",
    lat: 28.5245,
    lng: 77.1855,
    description: "UNESCO World Heritage Site.",
  },
  {
    name: "Humayun's Tomb",
    lat: 28.5933,
    lng: 77.2507,
    description: "Beautiful Mughal architecture.",
  },
];

function MapController({
  position,
}: {
  position: [number, number];
}) {
  const map = useMap();

  map.flyTo(position, 14, {
    duration: 1.5,
  });

  return null;
}

export default function MapView() {
  const [search, setSearch] = useState("");
  const [startLocation, setStartLocation] = useState("India Gate");
const [startPosition, setStartPosition] = useState<[number, number]>([
  28.6129,
  77.2295,
]);
  const [position, setPosition] = useState<[number, number]>([
    28.6139,
    77.209,
  ]);
  const [message, setMessage] = useState("");
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);
const [routeInfo, setRouteInfo] = useState("");
const [travelMode, setTravelMode] = useState("driving-car");
const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  async function searchLocation() {
    if (!search.trim()) {
      setMessage("Please enter a destination.");
      return;
    }

    try {
      setMessage("Searching...");

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=in&viewbox=76.8,28.9,77.5,28.4&bounded=1&q=${encodeURIComponent(
          search + ", Delhi"
        )}`
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();

      if (data.length === 0) {
        setMessage("Location not found. Try another place.");
        return;
      }

      setPosition([
        Number(data[0].lat),
        Number(data[0].lon),
      ]);

      setMessage(`Found: ${data[0].display_name}`);
    } catch {
      setMessage("Unable to search. Please try again.");
    }
  }
  function getCurrentLocation() {
  if (!navigator.geolocation) {
    setMessage("Geolocation is not supported by your browser.");
    return;
  }

  setMessage("Detecting your current location...");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setStartPosition([latitude, longitude]);
      setStartLocation("My Current Location");
      setUseCurrentLocation(true);

      setMessage("Current location detected successfully!");
    },
    (error) => {
      console.error("Location error:", error);
      setMessage("Unable to access location. Please allow location permission.");
    }
  );
}
function resetRoute() {
  setRouteCoordinates([]);
  setRouteInfo("");
  setMessage("");

  setStartLocation("India Gate");
  setStartPosition([28.6129, 77.2295]);
  setUseCurrentLocation(false);

  setSearch("");
  setPosition([28.6139, 77.209]);
}


  async function calculateRoute() {
  try {
    setMessage("Calculating route...");

    // Find the coordinates of the entered starting location
const startResponse = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(startLocation + ", Delhi, India")}`
);

let start: number[];

if (useCurrentLocation) {
  // Use GPS coordinates
  start = [startPosition[1], startPosition[0]];
} else {
  // Search for manually entered starting location
  const startResponse = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(startLocation + ", Delhi, India")}`
  );

  const startData = await startResponse.json();

  if (!startData || startData.length === 0) {
    throw new Error("Starting location not found.");
  }

  const startLat = Number(startData[0].lat);
  const startLon = Number(startData[0].lon);

  setStartPosition([startLat, startLon]);

  start = [startLon, startLat];
}

    // Selected destination
    const end = [position[1], position[0]];

    const response = await fetch("/api/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  coordinates: [start, end],
  profile: travelMode,
}),
    });

    const data = await response.json();
    console.log("FULL ROUTE RESPONSE:", data);

if (!data.features || !data.features[0]) {
  throw new Error(
    "Unexpected API response: " + JSON.stringify(data)
  );
}


    if (!response.ok) {
      throw new Error(
  `API Error ${response.status}: ${JSON.stringify(data)}`
);
    }

    const coordinates =
      data.features[0].geometry.coordinates;

    const summary = data.features[0].properties.summary;

    setRouteCoordinates(
      coordinates.map(
        (point: [number, number]) =>
          [point[1], point[0]] as [number, number]
      )
    );

    setRouteInfo(
      `Distance: ${(summary.distance / 1000).toFixed(2)} km | Time: ${(summary.duration / 60).toFixed(0)} min`
    );

    setMessage("Route calculated successfully!");

  } catch (error) {
    console.error("Route error:", error);
    setMessage("Unable to calculate route. Check the terminal for details.");
  }
}

  return (
    <section className="w-full py-10">
      <h2 className="text-3xl font-bold mb-3">
        Explore Delhi
      </h2>

      <p className="text-gray-500 mb-6">
        Discover and search destinations across Delhi.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <input
  type="text"
  value={startLocation}
  onChange={(e) => setStartLocation(e.target.value)}
  placeholder="Enter starting location..."
  className="flex-1 border rounded-xl px-4 py-3 text-black outline-none focus:ring-2 focus:ring-green-600"
/>
<button
  onClick={getCurrentLocation}
  className="bg-purple-700 text-white px-5 py-3 rounded-xl hover:bg-purple-800 whitespace-nowrap"
>
  📍 Use My Location
</button>
<button
  onClick={resetRoute}
  className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700"
>
  Reset Route
</button>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchLocation();
          }}
          placeholder="Search Delhi destinations..."
          className="flex-1 border rounded-xl px-4 py-3 text-black outline-none focus:ring-2 focus:ring-green-600"
        />
        <select
  value={travelMode}
  onChange={(e) => setTravelMode(e.target.value)}
  className="border rounded-xl px-4 py-3 text-black bg-white outline-none"
>
  <option value="driving-car">🚗 Driving</option>
  <option value="cycling-regular">🚴 Cycling</option>
  <option value="foot-walking">🚶 Walking</option>
</select>

        <button
          onClick={searchLocation}
          className="bg-green-800 text-white px-7 py-3 rounded-xl hover:bg-green-900"
        >
          Search
        </button>
        <button
  onClick={calculateRoute}
  className="bg-blue-700 text-white px-7 py-3 rounded-xl hover:bg-blue-800"
>
  Get Route
</button>
      </div>

      {message && (
        <p className="text-sm text-gray-600 mb-4 break-words">
          {message}
        </p>
      )}
      {routeInfo && (
  <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-200">

    <h3 className="text-xl font-bold text-gray-800 mb-4">
      Your Journey Details
    </h3>

    <div className="space-y-3 text-gray-700">

      <p>
        📍 <strong>Starting Point:</strong> {startLocation}
      </p>

      <p>
        🎯 <strong>Destination:</strong> {search}
      </p>

      <p>
        🚗 <strong>Travel Mode:</strong>{" "}
        {travelMode === "driving-car"
          ? "Driving"
          : travelMode === "cycling-regular"
          ? "Cycling"
          : "Walking"}
      </p>

      <div className="bg-green-50 rounded-xl p-4 mt-4">
        <p className="text-lg font-bold text-green-800">
          {routeInfo}
        </p>
      </div>

    </div>
  </div>
)}

      <MapContainer
        center={[28.6139, 77.209]}
        zoom={11}
        scrollWheelZoom={true}
        style={{
          height: "450px",
          width: "100%",
          borderRadius: "16px",
        }}
      >
        <MapController position={position} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((place) => (
          <CircleMarker
            key={place.name}
            center={[place.lat, place.lng]}
            radius={9}
            pathOptions={{
              color: "#166534",
              fillColor: "#22c55e",
              fillOpacity: 0.9,
            }}
          >
            <Popup>
              <strong>{place.name}</strong>
              <br />
              {place.description}
            </Popup>
          </CircleMarker>
        ))}

        <CircleMarker
          center={position}
          radius={12}
          pathOptions={{
            color: "#b45309",
            fillColor: "#f59e0b",
            fillOpacity: 1,
          }}
        >
          <Popup>Selected destination</Popup>
        </CircleMarker>
        <CircleMarker
  center={startPosition}
  radius={10}
  pathOptions={{
    color: "#1d4ed8",
    fillColor: "#3b82f6",
    fillOpacity: 1,
  }}
>
  <Popup>
    Starting Location: {startLocation}
  </Popup>
</CircleMarker>
        {routeCoordinates.length > 0 && (
  <Polyline
    positions={routeCoordinates}
    pathOptions={{
      color: "blue",
      weight: 5,
      opacity: 0.8,
    }}
  />
)}
      </MapContainer>
    </section>
  );
}