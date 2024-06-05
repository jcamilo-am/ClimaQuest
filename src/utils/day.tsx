export function obtenerDia(fechaString: string) {
    const fecha = new Date(fechaString);
    const hoy = new Date(Date.now());

    const hoyString = hoy.toISOString().split('T')[0];
    
    if (fechaString === hoyString) {
        return "Hoy";
    }
    
    const diasDeLaSemana = ["Dom", "Lun", "Mar", "Miér", "Jue", "Vier", "Sáb"];
    
    const diaDeLaSemana = diasDeLaSemana[fecha.getDay()];
    
    return diaDeLaSemana;
}