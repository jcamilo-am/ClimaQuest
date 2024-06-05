"use client"
import { useEffect, useState } from "react"
import InfoDataClime from "@/components/infoDataClime"
import { getDataGeolocation } from "@/utils/Geolocalization"
import { Location } from "@/interface/location"

function HomePage() {
  const [location, setLocation] = useState<Location | null>(null)
  const [error, setError] = useState<string | null>(null)

  function loadLocation() {
    getDataGeolocation()
      .then((location) => {
        setLocation(location)
        setError(null)
      })
      .catch((error) => {
        setError(error.message)
        setLocation(null)
      })
  }

  useEffect(() => {
    loadLocation()
  }, [])

  return (
    <div className="px-2 sm:px-8 md:px-16 lg:px-32 py-8">
      {error && <p className="text-red-500">{error}</p>}
      <InfoDataClime data={location} search="" />
    </div>
  )
}

export default HomePage
