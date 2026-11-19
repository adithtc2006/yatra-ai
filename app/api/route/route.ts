import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const apiKey = process.env.OPENROUTESERVICE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "ORS API key is missing" },
        { status: 500 }
      );
    }

    const allowedProfiles = [
      "driving-car",
      "cycling-regular",
      "foot-walking",
    ];

    const profile = body.profile || "driving-car";

    if (!allowedProfiles.includes(profile)) {
      return NextResponse.json(
        { error: "Invalid travel mode" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.heigit.org/openrouteservice/v2/directions/${profile}/geojson`,
      {
        method: "POST",
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates: body.coordinates,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("ORS ERROR:", data);

      return NextResponse.json(
        { error: "ORS request failed", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("ROUTE ERROR:", error);

    return NextResponse.json(
      { error: "Unable to calculate route" },
      { status: 500 }
    );
  }
}
