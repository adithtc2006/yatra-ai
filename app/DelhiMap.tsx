
"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(
  () => import("./MapView"),
  {
    ssr: false,
    loading: () => (
      <p className="py-10 text-center">
        Loading Delhi map...
      </p>
    ),
  }
);

export default function DelhiMap() {
  return <MapView />;
}

