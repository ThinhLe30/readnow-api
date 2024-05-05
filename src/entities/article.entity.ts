import { Entity, Enum, OneToOne, Property, Unique } from '@mikro-orm/core';
import { IsEmail } from 'class-validator';
import { Role } from '../common/enum/common.enum';
import { BaseUUID } from './baseUUID.enity';
import { Category } from './category.entity';

@Entity({ tableName: 'articles' })
export class Article extends BaseUUID {
  @Property({ nullable: false })
  author!: string;

  @Property({ nullable: false })
  title!: string;

  @Property({ nullable: false, columnType: 'text' })
  description!: string;

  @Property({ nullable: true, columnType: 'text' })
  url?: string;

  @Property({ nullable: false, columnType: 'text' })
  imageURL!: string;

  @Property({ nullable: true, columnType: 'longtext' })
  content!: string;

  @Property({ nullable: false })
  publishedAt!: Date;

  @OneToOne()
  category!: Category;
}
