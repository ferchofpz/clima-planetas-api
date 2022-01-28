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

    getPlanetas(): Planeta[]{
        return this.planetas;
    }

    genReporte(annos: number): Clima{
        let diasAnno = 365;
        let clima: Clima = new Clima();

        // Control paso del tiempo
        this.planetas.forEach(planeta => planeta.resetOrbita());
        for(let dia = 0; dia<(annos*diasAnno); dia++){
            
            if (this.haySequia())
                ++clima.diasSequia;

            let [hayLluvia, Atotal] = this.hayLluvia();
            if (hayLluvia){
                ++clima.periodosLluvia
                if(Atotal > clima.areaLluvia){
                    clima.areaLluvia = Atotal;
                    clima.diaPicoLluvia = dia;
                }
            }

            if (this.esOptimo())
                ++clima.diasOptimos;

            // Actualizar desplazamiento
            this.planetas.forEach(planeta => planeta.cambioOrbita());
        }

        return clima;
    }

    haySequia(): boolean{
        if(
            this.alineacionSolar(this.planetas[0].angulo, this.planetas[1].angulo) &&
            this.alineacionSolar(this.planetas[0].angulo, this.planetas[2].angulo) &&
            this.alineacionSolar(this.planetas[1].angulo, this.planetas[2].angulo) 
            )
        return true;
        else return false;
    }

    hayLluvia(): [boolean,number]{
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

        if(Atotal === AParcial) return [true, Atotal];
        return [false, Atotal];
    }

    esOptimo(): boolean{
        let m: number = this.calcularPendiente(this.planetas[0].x, this.planetas[0].y, this.planetas[2].x, this.planetas[2].y);
        let b: number = this.calcularCorteY(m, this.planetas[2].x, this.planetas[2].y);

        // La recta no pasa por el origen y el planeta pertenece a la recta
        if((this.planetas[1].y === m * this.planetas[1].x + b) && b != 0){
            return true;
        }

        return false;
    }

    // Helpers
    alineacionSolar(p1: number, p2: number): boolean{
        let diferencia = Math.abs(p1 - p2);
        return diferencia === 0 || diferencia === 180;
    }

    calcularAreaTriangulo(Ax,Ay,Bx,By,Cx,Cy): number{
        return Math.abs( ( Ax * ( By - Cy ) ) + ( Bx * ( Cy - Ay ) ) + ( Cx * ( Ay - By ) ) ) / 2;
    }

    calcularPendiente(Ax, Ay, Bx, By): number{
        return (By - Ay)/(Bx - Ax)
    }

    calcularCorteY(m, x, y): number{
        return y - (m*x);
    }
}