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
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-900 font-medium text-sm tracking-wide">Loading map...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="h-screen w-screen relative">
      {/* Full-screen map container */}
      <div className="h-full w-full">
        <Map />
      </div>

      {/* Footer with instructions */}
      <footer className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] max-w-[95vw]">
        <div className="bg-white/95 backdrop-blur-md border border-gray-200 shadow-sm rounded-full px-4 sm:px-5 py-2.5">
          <p className="text-gray-700 text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap overflow-hidden text-ellipsis text-center">
            Klik pada penanda untuk melihat butiran homestay
          </p>
        </div>
      </footer>
    </main>
  );
}
