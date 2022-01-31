import { Injectable } from '@nestjs/common';
import { Clima } from '../models/clima.model';
import { Planeta } from '../models/planeta.model';
import { Dia } from '../models/dia.model';

@Injectable()
export class ClimaService {

    isLoaded: boolean = false;
    yearsLoaded: number = 0;

    planetas : Planeta[] = [
        new Planeta("Ferengi",1,-1,500),
        new Planeta("Betasoide",3,-1,2000),
        new Planeta("Vulcano",5,1,1000)
    ];
    dias: Dia[] = [];
    clima: Clima = new Clima();

    jobClima(annos: string){
        console.log(`Ejecutando Job para ${annos} años`);
        this.loadData(+annos);
        // this.dias.forEach(dia => console.log(`Dia: ${dia.dia} Clima: ${dia.clima}`));
    }

    getPlanetas(): Planeta[]{
        return this.planetas;
    }

    getDia(dia: number): Dia{

        if(!this.isLoaded || dia > (this.yearsLoaded*365))
            this.loadData(Math.ceil(dia / 365));

        return this.dias[dia-1];
    }

    genReporte(annos: number): Clima{
        if(!this.isLoaded || annos != this.yearsLoaded)
            this.loadData(annos);
        return this.clima;
    }

    loadData(annos: number){
        this.clima = new Clima;
        this.dias.splice(0);
        this.planetas.forEach(planeta => planeta.resetOrbita());
        console.log(`Generando data para ${annos} años`);

        // Control paso del tiempo
        for(let dia = 1; dia<=(annos*365); dia++){
            let [hayLluvia, Atotal] = this.hayLluvia();

            if (this.haySequia()){
                ++this.clima.diasSequia;
                this.dias.push(new Dia(dia, "Sequia"));
            }
            else if (hayLluvia){
                ++this.clima.periodosLluvia
                this.dias.push(new Dia(dia, "Lluvia"));
                if(Atotal > this.clima.areaLluvia){
                    this.clima.areaLluvia = Atotal;
                    this.clima.diaPicoLluvia = dia;
                }
            }                
            else if (this.esOptimo()){
                ++this.clima.diasOptimos;
                this.dias.push(new Dia(dia, "Optimo"));
            }
            else{
                this.dias.push(new Dia(dia, "Indefinido"));
            }

            // Actualizar desplazamiento
            this.planetas.forEach(planeta => planeta.cambioOrbita());
        }

        this.isLoaded = true;
        this.yearsLoaded = annos;
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