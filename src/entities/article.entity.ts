import { Entity, Index, OneToOne, Property } from "@mikro-orm/core";
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

  @Property({ nullable: false, columnType: "text" })
  summary?: string;

  @Property({ nullable: false })
  publishedAt!: Date;

  @Property({ nullable: true })
  viewCount?: number;

  @OneToOne({
    unique: false,
    nullable: true,
    onDelete: "set null",
    onUpdateIntegrity: "cascade",
  })
  category: Category;
}
