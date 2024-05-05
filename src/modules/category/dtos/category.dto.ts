import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class CategoryDTO {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
