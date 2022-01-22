import { Controller, Get, Param } from '@nestjs/common';
import { Planetas } from 'src/interfaces/planetas.interface';
import { ClimaService } from './clima.service';
import { ReporteDto } from './dto/reporte-dto';

@Controller('clima')
export class ClimaController {
    constructor(
        private climaService: ClimaService
    ){}

    @Get('/planetas')
    getPlanetas(): Planetas[]{    
        return this.climaService.getPlanetas();
    }

    @Get('reporte/:annos')
    genReporte(@Param('annos') annos: number): ReporteDto{
        let reporteDto = new ReporteDto();
        reporteDto.encabezado.valor = annos;

        // Sequía
        reporteDto.reporte.sequia.valor = this.climaService.getTotalPeriodosSequia(annos);

        // Lluvia
        let {cantidadP, diaPico} = this.climaService.getPeriodosLluvia(annos);
        reporteDto.reporte.lluvia[0].valor = cantidadP;
        reporteDto.reporte.lluvia[1].valor = diaPico;

        return reporteDto;
    }
}
