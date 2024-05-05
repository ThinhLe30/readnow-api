import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

@Exclude()
export class CategoryUpdateDTO {
  @ApiProperty()
  @Expose()
  @IsNotEmpty({ message: "update without category name" })
  name!: string;
}
