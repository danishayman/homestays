/**
 * Homestay dummy data
 * 
 * Real homestay data around Sungai Besar, Selangor area.
 */

export interface Homestay {
    id: string;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    pricePerNight: number;
    imageUrl: string;
}

export const homestays: Homestay[] = [
    {
        id: "1",
        name: "Shamsiah Binti Hamjah",
        description: "Penglibatan tahun 2025. Lot 1401, Tali Air 14, Jalan Parit 14, Simpang Lima, 45300 Sungai Besar, Selangor.",
        latitude: 3.633288,
        longitude: 101.069565,
        pricePerNight: 150,
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop"
    },
    {
        id: "2",
        name: "Jamayah Binti Basiron",
        description: "Penglibatan tahun 2025. Lot 1107, Tebuk Haji Ros Jalan Rasidin, Jalan Pantai 3 Tebuk Rasidin, 45300 Sungai Besar, Selangor.",
        latitude: 3.649146,
        longitude: 101.006454,
        pricePerNight: 150,
        imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop"
    },
    {
        id: "3",
        name: "Abdul Rahman Bin Daud",
        description: "Penglibatan tahun 1996. Dorani Homestay, No. 3, Pekan Selasa Lama, Sungai Haji Dorani, Selangor, 45300 Sungai Besar, Selangor.",
        latitude: 3.7393729,
        longitude: 100.9452107,
        pricePerNight: 180,
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop"
    },
    {
        id: "4",
        name: "Muhammad Mustaqim Bin Mat Noor",
        description: "Penglibatan tahun 2025. PaddyStay Chalet, Jalan Kasawari Peket 60 Dalam, 45300 Sungai Besar, Selangor.",
        latitude: 3.638032,
        longitude: 101.043671,
        pricePerNight: 200,
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop"
    },
    {
        id: "5",
        name: "Kamil Yazid Bin Harun",
        description: "Penglibatan tahun 2015. Lot 5428, Jalan Tepi Parit Changkat, Sungai Haji Dorani, 45300 Sungai Besar, Selangor.",
        latitude: 3.634801,
        longitude: 101.031303,
        pricePerNight: 120,
        imageUrl: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&auto=format&fit=crop"
    },
    {
        id: "6",
        name: "Tuan Samsudin Bin Mohamad",
        description: "Penglibatan tahun 2010. No. 1, Jalan Parit 1 Sungai Panjang, Kampung Parit Empat, 45300 Sungai Besar, Selangor.",
        latitude: 3.645812,
        longitude: 101.035446,
        pricePerNight: 140,
        imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop"
    },
    {
        id: "7",
        name: "Miskiah Binti Sarbini",
        description: "Penglibatan tahun 2018. 122A Jalan Besar, Pekan Selasa Lama, Sungai Haji Dorani, 45300 Sungai Besar, Selangor.",
        latitude: 3.637836,
        longitude: 101.032135,
        pricePerNight: 130,
        imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop"
    }
];
