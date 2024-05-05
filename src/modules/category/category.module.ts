import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { Category } from "src/entities/category.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [MikroOrmModule.forFeature([Category])],
})
export class CategoryModule {}
