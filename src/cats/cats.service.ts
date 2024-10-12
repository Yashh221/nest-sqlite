import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cats.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number): Promise<Cat> {
    return this.catsRepository.findOneBy({ id });
  }

  async create(catData: Partial<Cat>): Promise<Cat> {
    const cat = this.catsRepository.create(catData);
    return this.catsRepository.save(cat);
  }

  async update(id: number, catData: Partial<Cat>): Promise<Cat> {
    await this.catsRepository.update(id, catData);
    const updatedCat = await this.catsRepository.findOneBy({ id });
    if (!updatedCat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return updatedCat;
  }

  async remove(id: number): Promise<void> {
    const result = await this.catsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
  }

  findByAgeRange(ageLte: number | null, ageGte: number | null): Promise<Cat[]> {
    const query = this.catsRepository.createQueryBuilder('cat');

    if (ageLte !== null) {
      query.andWhere('cat.age <= :ageLte', { ageLte });
    }

    if (ageGte !== null) {
      query.andWhere('cat.age >= :ageGte', { ageGte });
    }

    return query.getMany();
  }
}
