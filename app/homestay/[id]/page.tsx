/**
 * Homestay Details Page
 * 
 * Dynamic route that displays full details for a specific homestay.
 * Route: /homestay/[id]
 * 
 * This page receives the homestay ID from the URL parameters,
 * finds the matching homestay from our dummy data, and displays
 * all the details including a large image, name, participation year, and address.
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
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 font-medium transition-colors text-sm tracking-wide"
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
            <div className="max-w-3xl mx-auto px-4 py-12">
                {/* Large Hero Image */}
                <div className="relative w-full h-80 md:h-[28rem] rounded-xl overflow-hidden border border-gray-200 mb-10">
                    <Image
                        src={homestay.imageUrl}
                        alt={homestay.name}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                    />
                    {/* Participation Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-gray-900 px-4 py-1.5 rounded-md text-sm font-medium tracking-wide shadow-sm border border-gray-200">
                        Sejak {homestay.participation}
                    </div>
                </div>

                {/* Homestay Information */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-10">
                    {/* Name */}
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
                        {homestay.name}
                    </h1>

                    {/* Divider */}
                    <hr className="border-gray-100 my-8" />

                    {/* Full Address */}
                    <div className="mb-10">
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">
                            Alamat
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {homestay.address}
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                            <div>
                                <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">Berminat untuk menginap?</p>
                                <p className="text-xl font-medium text-gray-900 tracking-tight">
                                    Hubungi pengusaha homestay
                                </p>
                            </div>
                            <button className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white font-medium py-3 px-8 rounded-lg transition-colors">
                                Hubungi sekarang
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </main>
    );
}
