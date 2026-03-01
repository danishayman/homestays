"use client";

/**
 * HomestayPopup Component
 * 
 * Displays homestay information inside a Leaflet popup.
 * Shows name, participation year, address, and a link to the details page.
 */

import Link from "next/link";
import { Homestay } from "@/data/homestays";

interface HomestayPopupProps {
    homestay: Homestay;
}

export default function HomestayPopup({ homestay }: HomestayPopupProps) {
    return (
        <div className="min-w-[220px] p-2">
            {/* Homestay Name */}
            <h3 className="font-bold text-base text-gray-900 mb-1 leading-tight tracking-tight">
                {homestay.name}
            </h3>

            {/* Participation Year */}
            <p className="text-xs text-gray-500 font-medium tracking-wide uppercase mb-3">
                Penglibatan sejak {homestay.participation}
            </p>

            {/* Address - truncated to 80 chars */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                {homestay.address.length > 80
                    ? `${homestay.address.substring(0, 80)}...`
                    : homestay.address}
            </p>

            {/* View Details Button - navigates to /homestay/[id] */}
            <Link
                href={`/homestay/${homestay.id}`}
                className="block w-full text-center bg-gray-900 hover:bg-black py-2.5 px-4 rounded-md text-xs font-medium tracking-wide transition-colors"
                style={{ color: 'white' }}
            >
                Lihat Butiran
            </Link>
        </div>
    );
}
