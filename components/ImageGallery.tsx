"use client";

/**
 * ImageGallery Component
 * 
 * A reusable image gallery component that displays a main image
 * and smaller thumbnail images below. Supports touch/swipe navigation on mobile.
 */

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface ImageGalleryProps {
    images: string[];
    homestayName: string;
    className?: string;
}

export default function ImageGallery({ images, homestayName, className = "" }: ImageGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    if (!images || images.length === 0) {
        return null;
    }

    // Handle swipe gestures
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        
        const distance = touchStartX.current - touchEndX.current;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && selectedImageIndex < images.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }

        if (isRightSwipe && selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' && selectedImageIndex > 0) {
                setSelectedImageIndex(selectedImageIndex - 1);
            } else if (e.key === 'ArrowRight' && selectedImageIndex < images.length - 1) {
                setSelectedImageIndex(selectedImageIndex + 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex, images.length]);

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Main Image Display */}
            <div 
                className="relative w-full h-80 md:h-[28rem] rounded-xl overflow-hidden border border-gray-200 group"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <Image
                    src={images[selectedImageIndex]}
                    alt={`${homestayName} - Image ${selectedImageIndex + 1}`}
                    fill
                    className="object-cover transition-opacity duration-300"
                    priority={selectedImageIndex === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                />
                
                {/* Navigation arrows - only show if there are multiple images */}
                {images.length > 1 && (
                    <>
                        {/* Previous button */}
                        {selectedImageIndex > 0 && (
                            <button
                                onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 shadow-lg transition-all duration-200 opacity-80 group-hover:opacity-100 touch-manipulation"
                                aria-label="Gambar sebelumnya"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}
                        
                        {/* Next button */}
                        {selectedImageIndex < images.length - 1 && (
                            <button
                                onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 shadow-lg transition-all duration-200 opacity-80 group-hover:opacity-100 touch-manipulation"
                                aria-label="Gambar seterusnya"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </>
                )}
            </div>

            {/* Thumbnail Gallery - Only show if there are multiple images */}
            {images.length > 1 && (
                <div className="space-y-3">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImageIndex(index)}
                                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 touch-manipulation min-h-[80px] ${
                                    selectedImageIndex === index
                                        ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                                        : "border-gray-200 hover:border-gray-400 active:border-gray-500"
                                }`}
                                aria-label={`Lihat gambar ${index + 1}`}
                            >
                                <Image
                                    src={image}
                                    alt={`${homestayName} - Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1200px) 16vw, 120px"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Image Counter and Navigation Info */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-2">
                <div>Gambar {selectedImageIndex + 1} daripada {images.length}</div>
            </div>
        </div>
    );
}