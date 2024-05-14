import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsDate,
  IsDateString,
  IsNumberString,
  IsString,
  ValidateIf,
} from "class-validator";

export class SearchDTO {
  @ApiProperty()
  @ValidateIf((obj, value) => value)
  @IsString()
  keyword?: string;

  @ApiProperty()
  @ValidateIf((obj, value) => value)
  @IsDateString()
  fromDate?: Date;

  @ApiProperty()
  @ValidateIf((obj, value) => value)
  @IsDateString()
  toDate?: Date;

  @ApiProperty()
  @ValidateIf((obj, value) => value)
  @Transform(({ value }) => (value ? value.split(",").map(String) : []))
  categories?: string[];

  @ApiProperty()
  @ValidateIf((obj, value) => value)
  @IsNumberString()
  perPage?: number;

  @ApiProperty()
  @ValidateIf((obj, value) => value)
  @IsNumberString()
  page?: number;
}
