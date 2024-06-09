import { Entity, ManyToOne } from "@mikro-orm/core";
import { BaseUUID } from "./baseUUID.enity";
import { Article } from "./article.entity";
import { User } from "./user.entity";

@Entity({ tableName: "checklist" })
export class CheckList extends BaseUUID {
  @ManyToOne({
    entity: () => Article,
  })
  article!: Article;

  @ManyToOne({
    entity: () => User,
  })
  user!: User;
}
