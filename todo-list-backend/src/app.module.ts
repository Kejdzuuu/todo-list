import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoItemsModule } from './todoItems/todoItems.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI;

@Module({
  imports: [
    TodoItemsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),
    MongooseModule.forRoot(MONGODB_URI)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
