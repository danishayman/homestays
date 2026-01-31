/**
 * Homestay Details Page
 * 
 * Dynamic route that displays full details for a specific homestay.
 * Route: /homestay/[id]
 * 
 * This page receives the homestay ID from the URL parameters,
 * finds the matching homestay from our dummy data, and displays
 * all the details including a large image, name, description, and price.
 */

import Link from "next/link";
import Image from "next/image";
import { homestays } from "@/data/homestays";
import { notFound } from "next/navigation";

interface HomestayDetailsPageProps {
    params: Promise<{ id: string }>;
}

/**
 * Generate static params for all homestays
 * This enables static generation of all homestay detail pages
 */
export async function generateStaticParams() {
    return homestays.map((homestay) => ({
        id: homestay.id,
    }));
}

export default async function HomestayDetailsPage({ params }: HomestayDetailsPageProps) {
    // Await the params promise (Next.js 15+ requirement)
    const { id } = await params;

    // Find the homestay by ID from our dummy data
    const homestay = homestays.find((h) => h.id === id);

    // If homestay not found, show 404 page
    if (!homestay) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Back Navigation */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Back to Map
                </Link>
            </nav>

            {/* Content Container */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Large Hero Image */}
                <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl mb-8">
                    <Image
                        src={homestay.imageUrl}
                        alt={homestay.name}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                    />
                    {/* Price Badge */}
                    <div className="absolute bottom-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                        RM{homestay.pricePerNight} / night
                    </div>
                </div>

                {/* Homestay Information */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    {/* Name */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {homestay.name}
                    </h1>

                    {/* Location Coordinates */}
                    <div className="flex items-center gap-2 text-gray-500 mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <span className="text-sm">
                            {homestay.latitude.toFixed(4)}°N, {homestay.longitude.toFixed(4)}°E
                        </span>
                    </div>

                    {/* Divider */}
                    <hr className="border-gray-200 mb-6" />

                    {/* Full Description */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            About this place
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {homestay.description}
                        </p>
                    </div>

                    {/* Price Section */}
                    <div className="bg-emerald-50 rounded-xl p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <p className="text-gray-600 mb-1">Price per night</p>
                                <p className="text-3xl font-bold text-emerald-600">
                                    RM{homestay.pricePerNight}
                                </p>
                            </div>
                            <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-lg hover:shadow-xl">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Back Button (Mobile) */}
                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Back to Map
                    </Link>
                </div>
            </div>
        </main>
    );
}
