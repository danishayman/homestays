"use client";

/**
 * Map Component (Client-side only)
 * 
 * This component renders an interactive Leaflet map with OpenStreetMap tiles.
 * It displays markers for each homestay location.
 * 
 * IMPORTANT: This component must be imported dynamically with ssr: false
 * because Leaflet requires the window object which doesn't exist during SSR.
 */

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
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
const MAP_CENTER: [number, number] = [3.69073, 101.02700];
const MAP_ZOOM = 11.4;

export default function Map() {

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
        </div>
    );
}
