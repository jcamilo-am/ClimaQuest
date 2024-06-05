"use client"
import { Location } from "@/interface/location";
import { useState } from "react";

const GeolocalizacionComponent = () => {
    const [location, setLocation] = useState<Location>({lat: 0, lng: 0});
    const [error, setError] = useState<string | null>(null);

    const handleGetLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({ 
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setError(null);
            }, (error) => {
                setError(error.message);
            });
        }else{
            setError("Tu navegador no soporta la geolocalización");
        }
        
    }

    return(
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleGetLocation}>Obtener Ubicación</button>
            {location.lat && location.lng ? (
                <div>
                <p>Latitud: {location.lat}</p>
                <p>Longitud: {location.lng}</p>
                </div>
            ) : (
                <p>{error ? `Error: ${error}` : 'Ubicación no obtenida'}</p>
            )}
        </div>
    )
};

export default GeolocalizacionComponent;