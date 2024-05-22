import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsUrl } from "class-validator";

@Exclude()
export class ArticleUpdateDTO {
  @ApiProperty()
  @Expose()
  author?: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty({
    message: "article without title",
  })
  title?: string;

  @ApiProperty()
  @Expose()
  description?: string;

  @ApiProperty()
  @Expose()
  content?: string;

  @ApiProperty()
  @Expose()
  publishedAt?: Date;

  @ApiProperty()
  @Expose()
  categoryID?: string;
}
