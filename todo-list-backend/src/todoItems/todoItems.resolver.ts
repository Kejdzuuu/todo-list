import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { TodoItem } from './models/todoItem.model';
import { TodoItemsService } from './todoItems.service';

@Resolver()
export class TodoItemsResolver {
  constructor(
    private todoItemsService: TodoItemsService,
  ) {}

  @Query(() => [TodoItem])
  async allItems() {
    return this.todoItemsService.findAll();
  }

  @Mutation(returns => TodoItem)
  async addItem(@Args('content') content: string) {
    return this.todoItemsService.create(content);
  }

  @Mutation(returns => Boolean)
  async removeItem(@Args('id') id: string) {
    return this.todoItemsService.remove(id);
  }

  @Mutation(returns => Boolean)
  async updateItem(@Args('id') id: string) {
    return this.todoItemsService.update(id);
  }
}