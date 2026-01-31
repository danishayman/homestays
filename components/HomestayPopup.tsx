"use client";

/**
 * HomestayPopup Component
 * 
 * Displays homestay information inside a Leaflet popup.
 * Shows name, short description, price, and a link to the details page.
 */

import Link from "next/link";
import { Homestay } from "@/data/homestays";

interface HomestayPopupProps {
    homestay: Homestay;
}

export default function HomestayPopup({ homestay }: HomestayPopupProps) {
    return (
        <div className="min-w-[200px] p-1">
            {/* Homestay Name */}
            <h3 className="font-bold text-lg text-gray-900 mb-1">
                {homestay.name}
            </h3>

            {/* Short Description - truncated to 80 chars */}
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {homestay.description.length > 80
                    ? `${homestay.description.substring(0, 80)}...`
                    : homestay.description}
            </p>

            {/* Price */}
            <p className="text-base font-semibold text-emerald-600 mb-3">
                RM{homestay.pricePerNight} <span className="text-gray-500 font-normal text-sm">/ night</span>
            </p>

            {/* View Details Button - navigates to /homestay/[id] */}
            <Link
                href={`/homestay/${homestay.id}`}
                className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                style={{ color: 'white' }}
            >
                View Details
            </Link>
        </div>
    );
}
