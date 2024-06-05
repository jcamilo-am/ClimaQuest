

export async function getDetailsPlaceid(placeId: String) {
    const response = await fetch(
        `https://www.meteosource.com/api/v1/free/find_places?text=${placeId}&key=${process.env.NEXT_PUBLIC_KEY_API_METEOSOURCE}`,
    )
    const data = await response.json()
    return data
}