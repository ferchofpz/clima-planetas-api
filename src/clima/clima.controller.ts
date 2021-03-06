import { Controller, Get, Param } from '@nestjs/common';
import { Dia } from '../models/dia.model';
import { Planeta } from '../models/planeta.model';
import { ClimaService } from './clima.service';
import { ReporteDto } from './dto/reporte-dto';

@Controller('clima')
export class ClimaController {
    constructor(
        private climaService: ClimaService
    ){}

    @Get('/planetas')
    getPlanetas(): Planeta[]{    
        return this.climaService.getPlanetas();
    }

    @Get('reporte/:annos')
    genReporte(@Param('annos') annos: number): ReporteDto{
        let reporteDto = new ReporteDto();
        let clima = this.climaService.genReporte(annos);

        reporteDto.encabezado.valor = annos;
        reporteDto.reporte.sequia.valor = clima.diasSequia;
        reporteDto.reporte.lluvia[0].valor = clima.periodosLluvia;
        reporteDto.reporte.lluvia[1].valor = clima.diaPicoLluvia;
        reporteDto.reporte.optimos.cantidad = clima.diasOptimos;

        return reporteDto;
    }
    @Get('dia/:dia')
    getDias(@Param('dia') dia: number): Dia{
        return this.climaService.getDia(dia);
    }
}
