"use client"
import GetDetailsClimeController from "@/controllers/getDetailsClimeController";
import { GetDetailsWithLonAndLng } from "@/controllers/getDetailsWithLonAndLngController"; 
import { Location } from "@/interface/location";
import { useEffect, useRef, useState } from "react";
import Loading from "./loading";
import GetDetailsWithPlaceIdController from "@/controllers/getDetailsWithPlaceIdController";
import { IoCalendarNumber } from "react-icons/io5";
import { obtenerDia } from "@/utils/day";
import Image from "next/image";
import { FaCircleInfo } from "react-icons/fa6";
import moment from 'moment';
import { MdAccessTimeFilled } from "react-icons/md";

export default function InfoDataClime({ data, search }: { data: Location | null, search: string }) {
    const [showLocation, setShowLocation] = useState<any | null>(null);
    const [showClime, setShowClime] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const prevDataRef = useRef<Location | null>(null);

    const fetchData = async () => {
            setLoading(true);
            try {
                let response;
                if (data) {
                    response = await GetDetailsWithLonAndLng(data);
                    setShowLocation(response);
                }
                console.log(search);
                const responseClime = (data) ? 
                            await GetDetailsWithPlaceIdController(response.place_id) 
                            : (search !== "") ? 
                                    await GetDetailsWithPlaceIdController(search) 
                                    : await GetDetailsClimeController();

                console.log(responseClime);
                setShowClime(responseClime);
            } catch (error) {
                console.log(error);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {

        if (prevDataRef.current !== data) {
            fetchData();
        }

        prevDataRef.current = data;
    }, [data]);

    useEffect(() => {
        if(search != "") {
            fetchData();
        }
    }, [search]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`w-full h-full p-2 bg-slate-200 dark:bg-slate-700 rounded border-2 border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center`}>
                {loading ? <Loading /> : <>
                    <b className="text-1xl lg:text-2xl font-bold mt-1 xl:mt-2">
                        {(showLocation && showLocation.name) ? showLocation.name : (search !== "") ? search : "Clima"}
                    </b>
                    <span className="text-3xl md:text-5xl lg:text-6xl font-bold mt-3 md:mt-5">
                        {showClime.current.temperature}
                        <span className="ml-2">°</span>
                    </span>
                    <b className="text-sm text-gray-700 dark:text-slate-200 mb-2">
                        {showClime.current.summary}
                    </b>
                    <span className="grid grid-cols-2 gap-2">
                        <div>Min: {showClime.daily.data[0].all_day.temperature_min}°</div>
                        <div>Max: {showClime.daily.data[0].all_day.temperature_max}°</div>
                    </span>

                    <span className="text-sm my-3 text-gray-500 dark:text-slate-500 flex items-center">
                        <FaCircleInfo className=" text-gray-500 dark:text-slate-500 mr-2" />
                        {showClime.daily.data[0].summary}
                    </span>
                </>}
            </div>

            <div className={`w-full h-full md:max-h-72 p-2 bg-slate-200 dark:bg-slate-700 rounded border-2 border-gray-300 dark:border-gray-600 flex flex-col items-center justify-start overflow-hidden`}>
                {loading ? <Loading /> : <>
                    <span className="mb-2 w-full text-start pb-1 uppercase text-gray-500 dark:text-slate-500">
                        <div className="flex items-center">
                            <IoCalendarNumber className="mr-2" />
                            Pronóstico para los próximos 7 días
                        </div>
                    </span>
                    <div className="w-full h-full overflow-x-hidden overflow-y-auto local-scroll">
                        {showClime.daily.data.map((item: any) => (
                            <ShowDaily 
                                key={item.day}
                                data={item}
                            />
                        ))}
                    </div>
                </>}
            </div>

            <div className={`w-full col-span-full h-full md:max-h-72 p-2 bg-slate-200 dark:bg-slate-700 rounded border-2 border-gray-300 dark:border-gray-600 flex flex-col items-center justify-start overflow-hidden`}>
                {loading ? <Loading /> : <>
                    <span className="mb-2 w-full text-start pb-1 uppercase text-gray-500 dark:text-slate-500">
                        <div className="flex items-center">
                            <MdAccessTimeFilled className="mr-2" />
                            Pronóstico por Hora
                        </div>
                    </span>
                    <div className="w-full h-full overflow-y-hidden overflow-x-auto local-scroll">
                            <ShowHourly 
                                hourly={showClime.hourly.data}
                            />
                    </div>
                </>}
            </div>
        </div>
    );
}

function ShowDaily({ data }: { data: any }) {
    return (
        <div 
            key={data.day} 
            className="p-3 border-y border-gray-300 dark:border-gray-600 flex flex-col items-start justify-center"
        >
            <div className="grid grid-cols-4 gap-x-3 w-full">
                <span>{obtenerDia(data.day)}</span>
                <div className="flex items-center">
                    <p className="text-sm mr-1">{`${data.all_day.cloud_cover.total}%`} </p>
                    <Image
                        src={`/images/${data.icon}.png`}
                        alt={data.summary}
                        width={25}
                        height={25}
                    />
                </div>
                <div>Min: {data.all_day.temperature_min}°</div>
                <div>Max: {data.all_day.temperature_max}°</div>
            </div>
        </div>
    );
}

function ShowHourly({ hourly }: { hourly: any[] }) {
    const currentHour = moment().format('HH:00');
    console.log(hourly);
    
    return (
        <div className="overflow-x-auto overflow-y-hidden local-scroll">
            <div className="flex flex-nowrap">
                {hourly.map((data: any, index: any) => {
                    const hour = moment(data.date).format('HH:00');
                    const displayHour = hour === currentHour ? 'ahora' : moment(data.date).format('HH:mm');

                    return (
                        <div key={index} className="flex flex-col items-center m-2 p-2 border rounded shadow-lg min-w-[100px]">
                            <span className="text-lg font-bold">{displayHour}</span>
                            <img src={`/images/${data.icon}.png`} alt={data.summary} className="w-12 h-12" />
                            <span className="text-xl">{data.temperature}°C</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


