import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { Category } from "src/entities/category.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { UsersService } from "../users/users.service";
import { User } from "src/entities";

@Module({
  providers: [CategoryService, UsersService],
  controllers: [CategoryController],
  imports: [MikroOrmModule.forFeature([Category, User])],
})
export class CategoryModule {}
