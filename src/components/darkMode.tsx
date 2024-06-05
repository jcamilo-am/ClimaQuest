"use client"
import { useEffect, useState } from 'react';
import { IoSunny, IoMoon } from "react-icons/io5";

export default function DarkMode() {
    const [theme, setTheme] = useState(() => {
        return "dark";
        //return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        if(theme === "dark") {
            document.querySelector("html")?.classList.add("dark");
        } else {
            document.querySelector("html")?.classList.remove("dark");
        }
    }, [theme])

    const changeTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    //MEJORAR LA VISIBILIDAD
    return (
        <div className="relative">
            <button
                className="fixed bottom-4 hover:right-0.5 -right-8 duration-500 border border-gray-300 dark:border-gray-700 p-3 hover:p-4 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 bg-white dark:bg-gray-900" 
                onClick={changeTheme}
            >
                {
                    theme === "light" ? 
                        <IoMoon className='text-2xl text-gray-800 hover:text-gray-950 dark:text-gray-200' /> 
                        : <IoSunny className='text-2xl text-gray-800 hover:text-gray-950 dark:text-gray-200' />
                }
            </button>
        </div>
    )
}