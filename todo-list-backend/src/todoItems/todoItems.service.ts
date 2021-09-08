import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TodoItem, TodoItemDocument } from './schemas/todoItem.schema';
//import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class TodoItemsService {
  constructor(@InjectModel(TodoItem.name) private todoItemModel: Model<TodoItemDocument>) {}

  async findAll(): Promise<TodoItem[]> {
    return this.todoItemModel.find().exec();
  }

  async create(content: string): Promise<TodoItem> {
    const newItem = new this.todoItemModel({ content: content, done: false })
    return newItem.save();
  }

  async remove(id: string): Promise<Boolean> {
    try {
      await (await this.todoItemModel.findById(id)).delete();
      return true;
    } catch(e) {
      return false;
    }
  }

  async update(id: string): Promise<Boolean> {
    const item = await this.todoItemModel.findById(id);
    if (!item) {
      return false;
    }
    try {
      await this.todoItemModel.findByIdAndUpdate(item.id, { done: !item.done }, {new: true});
      return true;
    } catch (e) {
      return false;
    }
  }
}
