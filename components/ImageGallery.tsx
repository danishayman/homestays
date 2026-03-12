"use client";

/**
 * ImageGallery Component
 * 
 * A reusable image gallery component that displays a main image
 * and smaller thumbnail images below.
 */

import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProps {
    images: string[];
    homestayName: string;
    className?: string;
}

export default function ImageGallery({ images, homestayName, className = "" }: ImageGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Main Image Display */}
            <div className="relative w-full h-80 md:h-[28rem] rounded-xl overflow-hidden border border-gray-200">
                <Image
                    src={images[selectedImageIndex]}
                    alt={`${homestayName} - Image ${selectedImageIndex + 1}`}
                    fill
                    className="object-cover transition-opacity duration-300"
                    priority={selectedImageIndex === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                />
            </div>

            {/* Thumbnail Gallery - Only show if there are multiple images */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                                selectedImageIndex === index
                                    ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                                    : "border-gray-200 hover:border-gray-400"
                            }`}
                        >
                            <Image
                                src={image}
                                alt={`${homestayName} - Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 16vw, 120px"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Image Counter */}
            <div className="text-center text-sm text-gray-500">
                Image {selectedImageIndex + 1} of {images.length}
            </div>
        </div>
    );
}