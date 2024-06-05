import InfoDataClime from '@/components/infoDataClime'
import React from 'react'

export default function Page({ params }: { params: { place_id: string } }) {
    return (
        <div className="px-2 sm:px-8 md:px-16 lg:px-32 py-8">
            <InfoDataClime 
                data={null} 
                search={params.place_id} />
        </div>
    )
}
