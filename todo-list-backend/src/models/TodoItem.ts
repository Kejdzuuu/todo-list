import mongoose from "mongoose";

interface TodoItem extends mongoose.Schema {
  content: string;
  done: boolean;
  id: string;
}

const schema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
  }
});

schema.set('toJSON', {
  transform: (_document: TodoItem, returnedObject) => {
    returnedObject.id = returnedObject._id as string;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default mongoose.model<TodoItem>('TodoItem', schema);
