import Link from "next/link"
import { BsCloudSunFill } from "react-icons/bs";

export default function Navbar() {
    return <nav 
        className="w-full h-16 bg-slate-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 px-2 md:px-8 lg:px-16 flex justify-between items-center py-2"
    >
        <Link href={`/`}>
            <BsCloudSunFill className="text-4xl"/>
        </Link>
        <Link href={"/search"} className="text-1xl font-bold bg-gray-800 dark:bg-slate-200 hover:bg-gray-700 dark:hover:bg-slate-300 p-2 rounded text-slate-50 dark:text-gray-900 scale-100 hover:scale-110 transition-all duration-200" >
            Buscar ciudad
        </Link>
    
    </nav>
}
