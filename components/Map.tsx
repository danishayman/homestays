"use client";

/**
 * Map Component (Client-side only)
 * 
 * This component renders an interactive Leaflet map with OpenStreetMap tiles.
 * It displays markers for each homestay location.
 * Shows mouse coordinates on hover.
 * 
 * IMPORTANT: This component must be imported dynamically with ssr: false
 * because Leaflet requires the window object which doesn't exist during SSR.
 */

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { Icon, LatLng } from "leaflet";
import { homestays } from "@/data/homestays";
import HomestayPopup from "./HomestayPopup";

// Import Leaflet CSS - required for proper map rendering
import "leaflet/dist/leaflet.css";

/**
 * Custom marker icon configuration
 * Using red marker icon from CDN
 */
const customIcon = new Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Center map on Rawang/Selayang area
const MAP_CENTER: [number, number] = [3.694851, 101.047955];
const MAP_ZOOM = 13;

/**
 * MouseCoordinates Component
 * 
 * Tracks mouse position on the map and passes coordinates to parent.
 * Uses react-leaflet's useMapEvents hook to listen for mousemove events.
 */
function MouseCoordinates({
    onMouseMove
}: {
    onMouseMove: (coords: LatLng | null) => void
}) {
    useMapEvents({
        mousemove: (e) => {
            onMouseMove(e.latlng);
        },
        mouseout: () => {
            onMouseMove(null);
        }
    });
    return null;
}

export default function Map() {
    // State to track current mouse coordinates
    const [mouseCoords, setMouseCoords] = useState<LatLng | null>(null);

    return (
        <div className="relative h-full w-full">
            <MapContainer
                center={MAP_CENTER}
                zoom={MAP_ZOOM}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                {/* OpenStreetMap tile layer - free and doesn't require API key */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Mouse coordinate tracker */}
                <MouseCoordinates onMouseMove={setMouseCoords} />

                {/* Render a marker for each homestay */}
                {homestays.map((homestay) => (
                    <Marker
                        key={homestay.id}
                        position={[homestay.latitude, homestay.longitude]}
                        icon={customIcon}
                    >
                        {/* Popup shown when marker is clicked */}
                        <Popup>
                            <HomestayPopup homestay={homestay} />
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Coordinate display overlay - shows when hovering on map */}
            {mouseCoords && (
                <div className="absolute bottom-4 left-4 z-[1000] bg-black/70 text-white px-3 py-2 rounded-lg text-sm font-mono shadow-lg">
                    <span className="text-emerald-400">Lat:</span> {mouseCoords.lat.toFixed(6)}
                    <span className="mx-2">|</span>
                    <span className="text-emerald-400">Lng:</span> {mouseCoords.lng.toFixed(6)}
                </div>
            )}
        </div>
    );
}
