async function GetDetailsClimeController() {
    
    const response = await fetch(
        `https://www.meteosource.com/api/v1/free/point?place_id=Mocoa&sections=all&timezone=UTC&language=en&units=metric&key=${process.env.NEXT_PUBLIC_KEY_API_METEOSOURCE}`,
    )
    const data = await response.json()
    return data
}

export default GetDetailsClimeController


