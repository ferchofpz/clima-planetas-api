export class ReporteDto {
    encabezado= {
        descripcion: "Años calculados",
        valor: 0
    };
    reporte= {
        sequia: {
            descripcion: "Periodos de sequia",
            valor: 0
        },
        lluvia: [
            {descripcion: "Periodos de lluvia", valor: 0},
            {descripcion: "Día máxima lluvia", valor: 0}
        ],
        optimos: {
            descripcion: "Periodos con condiciones optimas",
            cantidad: 0,
            periodos: [
                {dia: 0, temperatura: 0}
            ]
        }
    };
}
