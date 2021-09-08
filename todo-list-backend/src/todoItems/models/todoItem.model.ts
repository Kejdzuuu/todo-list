import { Field, Int, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class TodoItem {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field()
  done: boolean;
}
