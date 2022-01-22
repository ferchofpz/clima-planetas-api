import { Test, TestingModule } from '@nestjs/testing';
import { ClimaController } from './clima.controller';

describe('ClimaController', () => {
  let controller: ClimaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClimaController],
    }).compile();

    controller = module.get<ClimaController>(ClimaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
