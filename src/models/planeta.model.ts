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

    resetOrbita(){
        this.angulo = 0;
        this.x = this.distancia;
        this.y = 0;
    }

    cambioOrbita(){
        let newAngulo = this.angulo + (this.velocidad * this.sentido);

        if(newAngulo < 0) newAngulo+=360;
        if(newAngulo >= 360) newAngulo-=360;

        let {x,y} = this.coordenadaPolar(this.distancia, newAngulo);

        this.angulo = newAngulo;
        this.x = x;
        this.y = y;
    }

    private coordenadaPolar(radio: number, angulo: number): {x: number,y: number}{
        let x: number = +(radio * Math.cos(angulo*Math.PI/180)).toFixed(0);
        let y: number = +(radio * Math.sin(angulo*Math.PI/180)).toFixed(0);

        // console.log(`Radio ${radio}, Angulo ${angulo}, X ${x}, Y ${y}`);
        return {x,y};
    }
}
