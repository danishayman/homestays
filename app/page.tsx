"use client";

/**
 * Landing Page - Full Screen Map
 * 
 * This is the main entry point of the application.
 * It renders a full-screen interactive map showing all homestay locations.
 * 
 * NOTE: This is a Client Component because we use next/dynamic with ssr: false
 * to prevent Leaflet from being rendered on the server (it requires browser APIs).
 */

import dynamic from "next/dynamic";

/**
 * Dynamic import of Map component with SSR disabled
 * 
 * Why dynamic import?
 * - Leaflet uses browser APIs (window, document) that don't exist in Node.js
 * - Next.js App Router renders components on the server by default
 * - Using dynamic() with ssr: false ensures the Map only renders client-side
 * 
 * The loading state shows while the component is being loaded
 */
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Loading map...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="h-screen w-screen relative">
      {/* Header overlay on top of the map */}
      <header className="absolute top-0 left-0 right-0 z-[1000] bg-gradient-to-b from-black/50 to-transparent p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
          🏡 Homestay Finder
        </h1>
        <p className="text-white/80 text-sm md:text-base mt-1 drop-shadow">
          Discover unique places to stay across Malaysia
        </p>
      </header>

      {/* Full-screen map container */}
      <div className="h-full w-full">
        <Map />
      </div>

      {/* Footer with instructions */}
      <footer className="absolute bottom-0 left-0 right-0 z-[1000] bg-gradient-to-t from-black/50 to-transparent p-4">
        <p className="text-white/80 text-sm text-center drop-shadow">
          Click on a marker to view homestay details
        </p>
      </footer>
    </main>
  );
}
