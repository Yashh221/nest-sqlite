import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Post()
  create(@Body() body: any) {
    try {
      const { error, value } = CreateTodoDTO.validate(body);
      if (error) {
        throw new BadRequestException(error.message);
      }
      return this.todoService.createTodo(value.title);
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  get() {
    try {
      return this.todoService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    try {
      const { error, value } = UpdateTodoDTO.validate({ id, ...body });
      if (error) {
        throw new BadRequestException(error.message);
      }
      return this.todoService.updateTodo(value.id, value.isCompleted);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    try {
      return this.todoService.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
