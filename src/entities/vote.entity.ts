import { Entity, Enum, ManyToOne, Property, Unique } from "@mikro-orm/core";
import { IsEmail } from "class-validator";
import { Role } from "../common/enum/common.enum";
import { BaseUUID } from "./baseUUID.enity";
import { Article } from "./article.entity";
import { User } from "./user.entity";

@Entity({ tableName: "votes" })
export class Vote extends BaseUUID {
  @ManyToOne({
    entity: () => Article,
  })
  article!: Article;

  @ManyToOne({
    entity: () => User,
  })
  user!: User;
}
