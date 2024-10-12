import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cats.entity';
import { CreateCatDTO } from './dto/create-cat.dto';
import { JwtAuthGuard } from '../auth/auth-guard';
import { UpdateCatDTO } from './dto/update-cat.dto';

@UseGuards(JwtAuthGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(+id);
  }

  @Get('sea')
  async findByAgeRange(
    @Query('age_lte') ageLte?: string,
    @Query('age_gte') ageGte?: string,
  ) {
    if (!ageLte && !ageGte) {
      throw new BadRequestException(
        'At least one of age_lte or age_gte must be provided',
      );
    }
    return this.catsService.findByAgeRange(
      ageLte ? +ageLte : null,
      ageGte ? +ageGte : null,
    );
  }

  @Post()
  async create(@Body() body: any): Promise<Cat> {
    const { error, value } = CreateCatDTO.validate(body);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return this.catsService.create(value);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any): Promise<Cat> {
    const { error, value } = UpdateCatDTO.validate({ id, ...body });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return this.catsService.update(+id, value);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.catsService.remove(+id);
  }
}
