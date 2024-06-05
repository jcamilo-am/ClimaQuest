import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
    return <div className="w-full h-full  z-10 flex items-center justify-center">
        <AiOutlineLoading className="text-3xl animate-spin" />
    </div>
}
