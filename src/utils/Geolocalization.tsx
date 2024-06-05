"use client"
import { Location } from "@/interface/location"

export function getDataGeolocation() {
    return new Promise<Location>((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            reject(new Error("Tu navegador no soporta la geolocalización"));
        }
    });
}
