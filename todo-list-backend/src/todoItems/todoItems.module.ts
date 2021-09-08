import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoItemsResolver } from './todoItems.resolver';
import { TodoItemSchema, TodoItem } from './schemas/todoItem.schema';
import { TodoItemsService } from './todoItems.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TodoItem.name, schema: TodoItemSchema }])],
  providers: [TodoItemsResolver, TodoItemsService],
})
export class TodoItemsModule {}
