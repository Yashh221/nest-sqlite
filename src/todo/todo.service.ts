import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async findAll() {
    return await this.todoRepository.find();
  }
  async createTodo(title: string) {
    const todo = new Todo();
    todo.title = title;
    return await this.todoRepository.save(todo);
  }
  async updateTodo(id: number, isCompleted: boolean) {
    const todo = await this.todoRepository.findOne({ where: { id: id } });
    if (todo) {
      todo.isCompleted = isCompleted;
    }
    return this.todoRepository.save(todo);
  }
  async delete(id: number) {
    return await this.todoRepository.delete(id).then(() => {});
  }
}
