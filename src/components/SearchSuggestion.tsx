import Link from "next/link";

const SearchSuggestion = ({info, search }:{info: any[], search: string}) => {
    return <>
      {info.length === 0 && <p className="text-gray-700 dark:text-slate-200 mt-2">No se encontraron resultados para <i>{search}</i></p>}
      {info.map(({name, adm_area1, country, lat, lon, place_id}) => (
        <Link href={`/search/${place_id}`} key={place_id} className="w-full max-w-xl mx-auto mt-4 p-4 bg-slate-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="w-1/2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{name}</h2>
              <p className="text-sm text-gray-700 dark:text-slate-200 mt-1">{adm_area1}</p>
              <p className="text-sm text-gray-700 dark:text-slate-200 mt-1">Detalles adicionales</p>
            </div>
            <div className="w-1/2 flex flex-col items-end">
              <p className="text-sm pt-6 text-gray-700 dark:text-slate-200 mt-2">{country}</p>
              <div className="flex justify-end mt-1">
                <span className="text-gray-700 dark:text-slate-200 mr-4">Lat: {lat}°</span>
                <span className="text-gray-700 dark:text-slate-200">Lon: {lon}°</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  };
  
  export default SearchSuggestion;
  
  
  
  
  
  