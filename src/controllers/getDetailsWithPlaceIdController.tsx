export default async function GetDetailsWithPlaceIdController(place_id: string) {
    
    const response = await fetch(
        `https://www.meteosource.com/api/v1/free/point?place_id=${place_id}&sections=all&timezone=UTC&language=en&units=metric&key=${process.env.NEXT_PUBLIC_KEY_API_METEOSOURCE}`,
    )
    const data = await response.json()
    return data
}


