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
    
    getTotalPeriodosSequia(annos: number){
        return annos;
    }
}