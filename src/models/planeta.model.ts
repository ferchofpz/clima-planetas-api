export class Planeta {
    // Horario: -1, Antihorario: 1
    nombre: string;
    velocidad: number;
    sentido: number;
    distancia: number;
    angulo: number;
    x: number;
    y: number;

    constructor(nombre, velocidad, sentido, distancia){
        this.nombre = nombre;
        this.velocidad = velocidad;
        this.sentido = sentido;
        this.distancia = distancia;
        
        this.angulo = 0;
        this.x = distancia;
        this.y = 0;
    }
}
