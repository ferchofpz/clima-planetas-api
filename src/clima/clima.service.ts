import { Injectable } from '@nestjs/common';
import { Planetas } from 'src/interfaces/planetas.interface';

@Injectable()
export class ClimaService {
    planetas: Planetas[] = [
        {nombre: "Ferengi", velocidad: 1, sentido: 1, distancia: 500},
        {nombre: "Betasoide", velocidad: 3, sentido: 1, distancia: 2000},
        {nombre: "Vulcano", velocidad: 5, sentido: -1, distancia: 1000}
    ];


    getPlanetas(): Planetas[]{
        return this.planetas;
    }
    
    getTotalPeriodosSequia(annos: number): number{
        let diasAnno = 365;
        let diasSequia = 0;
        let angulos: number[] = [0,0,0];

        for(let i = 0; i<(annos*diasAnno); i++){
            if(
                this.alineacionSolar(angulos[0], angulos[1]) &&
                this.alineacionSolar(angulos[0], angulos[2]) &&
                this.alineacionSolar(angulos[1], angulos[2]) 
            )
                ++diasSequia;

            angulos.forEach((angulo,index) => {
                let newAngulo = angulo + this.planetas[index].velocidad;
                newAngulo <= 360? angulos[index] = newAngulo : angulos[index] = newAngulo-360; 
            });
        }

        return diasSequia;
    }

    getPeriodosLluvia(annos: number): {cantidadP: number, diaPico: number}{
        let cantidadP = 0;
        let diaPico = 0;
        
        return {cantidadP, diaPico};
    }

    // Helpers
    alineacionSolar(p1: number, p2: number): boolean{
        let diferencia = Math.abs(p1 - p2);
        return diferencia === 0 || diferencia === 180;
    }
}