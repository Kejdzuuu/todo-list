import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoItemDocument = TodoItem & Document;

@Schema()
export class TodoItem {

  @Prop({ required: true })
  content: string;

  @Prop()
  done: boolean;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);