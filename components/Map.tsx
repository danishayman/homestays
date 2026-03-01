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
                <div className="absolute bottom-6 left-6 z-[1000] bg-white/95 backdrop-blur border border-gray-200 text-gray-800 px-4 py-2.5 rounded-lg text-xs font-mono tracking-tight shadow-sm flex items-center gap-3">
                    <div>
                        <span className="text-gray-400 mr-1.5 uppercase text-[10px] tracking-wider font-sans">Lat</span>
                        <span className="font-medium text-gray-900">{mouseCoords.lat.toFixed(5)}</span>
                    </div>
                    <div className="w-[1px] h-3 bg-gray-200"></div>
                    <div>
                        <span className="text-gray-400 mr-1.5 uppercase text-[10px] tracking-wider font-sans">Lng</span>
                        <span className="font-medium text-gray-900">{mouseCoords.lng.toFixed(5)}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
