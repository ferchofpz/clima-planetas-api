import { Injectable } from '@nestjs/common';
import { Clima } from 'src/models/clima.model';
import { Planeta } from 'src/models/planeta.model';

@Injectable()
export class ClimaService {

    planetas : Planeta[] = [
        new Planeta("Ferengi",1,-1,500),
        new Planeta("Betasoide",3,-1,2000),
        new Planeta("Vulcano",5,1,1000)
    ];
    clima: Clima = new Clima();


    getPlanetas(): Planeta[]{
        return this.planetas;
    }

    genReporte(annos: number): Clima{
        let diasAnno = 365;

        // Control paso del tiempo
        for(let i = 0; i<(annos*diasAnno); i++){
            this.haySequia();
            this.hayLluvia(i);
            this.actualizarDesplazamiento();
        }

        return this.clima;
    }

    haySequia(){
        if(
            this.alineacionSolar(this.planetas[0].angulo, this.planetas[1].angulo) &&
            this.alineacionSolar(this.planetas[0].angulo, this.planetas[2].angulo) &&
            this.alineacionSolar(this.planetas[1].angulo, this.planetas[2].angulo) 
            )
        {
            // console.log(this.planetas);
            ++this.clima.diasSequia;
        }
    }

    hayLluvia(dia: number){
        let Atotal = this.calcularAreaTriangulo(
            this.planetas[0].x, this.planetas[0].y,
            this.planetas[1].x, this.planetas[1].y,
            this.planetas[2].x, this.planetas[2].y
        );
        let A1 = this.calcularAreaTriangulo(
            this.planetas[0].x, this.planetas[0].y,
            this.planetas[1].x, this.planetas[1].y,
            0,0
        );
        let A2 = this.calcularAreaTriangulo(
            this.planetas[0].x, this.planetas[0].y,
            this.planetas[2].x, this.planetas[2].y,
            0,0
        );
        let A3 = this.calcularAreaTriangulo(
            this.planetas[1].x, this.planetas[1].y,
            this.planetas[2].x, this.planetas[2].y,
            0,0
        );
        let AParcial = A1 + A2 + A3;

        if(Atotal === AParcial) ++this.clima.periodosLluvia;
        if(Atotal > this.clima.areaLluvia){
            this.clima.areaLluvia = Atotal;
            this.clima.diaPicoLluvia = dia;
        }
    }

    actualizarDesplazamiento(){
        this.planetas.forEach((planeta, index) => {
            let newAngulo = planeta.angulo + (planeta.velocidad * planeta.sentido);

            if(newAngulo < 0) newAngulo+=360;
            if(newAngulo > 360) newAngulo-=360;

            let {x,y} = this.coordenadaPolar(planeta.distancia, newAngulo);

            this.planetas[index].angulo = newAngulo;
            this.planetas[index].x = x;
            this.planetas[index].y = y;
        });
    }

    // Helpers
    alineacionSolar(p1: number, p2: number): boolean{
        let diferencia = Math.abs(p1 - p2);
        return diferencia === 0 || diferencia === 180;
    }

    coordenadaPolar(radio: number, angulo: number): {x: number,y: number}{
        let x: number = +(radio * Math.cos(angulo*Math.PI/180)).toFixed(2);
        let y: number = +(radio * Math.sin(angulo*Math.PI/180)).toFixed(2);

        // console.log(`Radio ${radio}, Angulo ${angulo}, X ${x}, Y ${y}`);
        return {x,y};
    }

    calcularAreaTriangulo(Ax,Ay,Bx,By,Cx,Cy): number{
        return Math.abs( ( Ax * ( By - Cy ) ) + ( Bx * ( Cy - Ay ) ) + ( Cx * ( Ay - By ) ) ) / 2;
    }
}