import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsUrl, isEmpty } from "class-validator";

@Exclude()
export class ArticleAddDTO {
  @ApiProperty()
  @Expose()
  @IsNotEmpty({
    message: "article without author",
  })
  author!: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty({
    message: "article without title",
  })
  title!: string;

  @ApiProperty()
  @Expose()
  description?: string;

  @ApiProperty()
  @Expose()
  url?: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty({
    message: "article without content",
  })
  content!: string;

  @ApiProperty()
  @Expose()
  publishedAt?: Date;

  @ApiProperty()
  @Expose()
  @IsNotEmpty({
    message: "article without category",
  })
  categoryID: string;
}
