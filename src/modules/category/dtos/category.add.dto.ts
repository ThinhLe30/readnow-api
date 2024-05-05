import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

@Exclude()
export class CategoryAddDTO {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  name!: string;
}
