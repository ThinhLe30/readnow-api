import {
  Entity,
  Enum,
  Index,
  OneToOne,
  Property,
  Unique,
} from "@mikro-orm/core";
import { IsEmail } from "class-validator";
import { Role } from "../common/enum/common.enum";
import { BaseUUID } from "./baseUUID.enity";
import { Category } from "./category.entity";

@Entity({ tableName: "articles" })
export class Article extends BaseUUID {
  @Index({ type: "fulltext" })
  @Property({ nullable: false })
  author!: string;

  @Index({ type: "fulltext" })
  @Property({ nullable: false })
  title!: string;

  @Index({ type: "fulltext" })
  @Property({ nullable: false, columnType: "text" })
  description!: string;

  @Property({ nullable: true, columnType: "text" })
  url?: string;

  @Property({ nullable: false, columnType: "text" })
  imageURL!: string;

  @Index({ type: "fulltext" })
  @Property({ nullable: true, columnType: "longtext" })
  content!: string;

  @Property({ nullable: true })
  summary?: string;

  @Property({ nullable: false })
  publishedAt!: Date;

  @Property({ nullable: true })
  viewCount?: number;

  @Property({ nullable: true })
  voteCount?: number;

  @OneToOne({
    unique: false,
    nullable: true,
    onDelete: "set null",
    onUpdateIntegrity: "cascade",
  })
  category: Category;
}
