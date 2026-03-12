/**
 * Homestay dummy data
 * 
 * Real homestay data around Sungai Besar, Selangor area.
 */

export interface Homestay {
    id: string;
    name: string;
    participation: string;
    address: string;
    latitude: number;
    longitude: number;
    imageUrl: string; // Main image for compatibility
}

/**
 * Helper function to get all images for a homestay based on its ID
 * Returns available images based on common naming patterns
 * You might need to adjust this based on your actual image file structure
 */
export function getHomestayImages(homestayId: string): string[] {
    // Define the maximum number of images to check for each homestay
    // You can customize this per homestay if needed
    const maxImagesToCheck = 5;
    const images: string[] = [];
    
    // For client-side, we'll return a predefined set based on what we know exists
    // In a real app, you'd want to do this server-side or via an API
    const imageCountMap: { [key: string]: number } = {
        "1": 2, // homestay 1 has 2 images
        "2": 2, // homestay 2 has 2 images  
        "3": 3, // homestay 3 has 3 images
        "4": 1, // homestay 4 has 1 image
        "5": 1, // homestay 5 has 1 image
        "6": 1  // homestay 6 has 1 image
    };
    
    const imageCount = imageCountMap[homestayId] || 1;
    
    for (let i = 1; i <= imageCount; i++) {
        images.push(`/images/${homestayId}/${i}.jpeg`);
    }
    
    return images;
}

/**
 * Get the main/first image for a homestay
 */
export function getMainHomestayImage(homestayId: string): string {
    return `/images/${homestayId}/1.jpeg`;
}

export const homestays: Homestay[] = [
    {
        id: "1",
        name: "Muhammad Mustaqim Bin Mat Noor",
        participation: "2025",
        address: "PaddyStay Chalet, Jalan Kasawari Peket 60 Dalam, 45300 Sungai Besar, Selangor",
        latitude: 3.638032,
        longitude: 101.043671,
        imageUrl: getMainHomestayImage("1")
    },
    {
        id: "2",
        name: "Jamayah Binti Basiron",
        participation: "2025",
        address: "Lot 1107, Tebuk Haji Ros Jalan Rasidin, Jalan Pantai 3 Tebuk Rasidin, 45300 Sungai Besar, Selangor",
        latitude: 3.649146,
        longitude: 101.006454,
        imageUrl: getMainHomestayImage("2")
    },
    {
        id: "3",
        name: "Kamil Yazid Bin Harun",
        participation: "2015",
        address: "Lot 5428, Jalan Tepi Parit Changkat, Sungai Haji Dorani, 45300 Sungai Besar, Selangor",
        latitude: 3.634801,
        longitude: 101.031303,
        imageUrl: getMainHomestayImage("3")
    },
    {
        id: "4",
        name: "Shamsiah Binti Hamjah",
        participation: "2025",
        address: "Lot 1401, Tali Air 14, Jalan Parit 14, Simpang Lima, 45300 Sungai Besar, Selangor",
        latitude: 3.633288,
        longitude: 101.069565,
        imageUrl: getMainHomestayImage("4")
    },
    {
        id: "5",
        name: "Miskiah Binti Sarbini",
        participation: "2018",
        address: "122A Jalan Besar, Pekan Selasa Lama, Sungai Haji Dorani, 45300 Sungai Besar, Selangor",
        latitude: 3.637836,
        longitude: 101.032135,
        imageUrl: getMainHomestayImage("5")
    },
    {
        id: "6",
        name: "Mohd Yatim Bin Basri",
        participation: "1996",
        address: "Dorani Homestay, No. 3, Pekan Selasa Lama, Sungai Haji Dorani, Selangor, 45300 Sungai Besar, Selangor",
        latitude: 3.7393729,
        longitude: 100.9452107,
        imageUrl: getMainHomestayImage("6")
    }
];
