import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './tasks/tasks.entity';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'src/schema.gql',
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3003,
      username: 'postgres',
      password: 'password',
      database: 'tasks-db',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    TasksModule,
    AuthModule
  ],
  providers: [Auth],
})
export class AppModule {}
