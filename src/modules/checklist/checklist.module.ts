import { Module } from "@nestjs/common";
import { ChecklistController } from "./checklist.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { User } from "src/entities";
import { UsersService } from "../users/users.service";
import { ChecklistService } from "./checklist.service";
import { CheckList } from "src/entities/checklist.entity";
import { Vote } from "src/entities/vote.entity";

@Module({
  controllers: [ChecklistController],
  imports: [MikroOrmModule.forFeature([User, CheckList, Vote])],
  providers: [UsersService, ChecklistService],
})
export class ChecklistModule {}
