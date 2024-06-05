import { Location } from "@/interface/location"

export async function GetDetailsWithLonAndLng(ubi: Location) {
    const response = await fetch(
        `https://www.meteosource.com/api/v1/free/nearest_place?lat=${ubi.lat}&lon=${ubi.lng}&key=${process.env.NEXT_PUBLIC_KEY_API_METEOSOURCE}`,
    )
    const data = await response.json()
    return data
}
