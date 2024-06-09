import { Entity, Property } from "@mikro-orm/core";
import { BaseUUID } from "./baseUUID.enity";

@Entity({ tableName: "categories" })
export class Category extends BaseUUID {
  @Property({ nullable: false })
  name!: string;
}
