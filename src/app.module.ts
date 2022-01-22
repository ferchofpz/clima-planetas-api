import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClimaModule } from './clima/clima.module';
import { ClimaService } from './clima/clima.service';

@Module({
  imports: [ClimaModule],
  controllers: [AppController],
  providers: [AppService, ClimaService],
})
export class AppModule {}
