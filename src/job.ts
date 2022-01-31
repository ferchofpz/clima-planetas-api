import { NestFactory } from '@nestjs/core';
import { ClimaModule } from './clima/clima.module';
import { ClimaService } from './clima/clima.service';

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(
    ClimaModule,
  );
  const climaService = application.get(ClimaService);
  const annos = process.argv[2];

  await climaService.jobClima(annos);
  await application.close();
}

bootstrap();