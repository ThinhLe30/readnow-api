import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { CategoryDTO } from "src/modules/category/dtos/category.dto";

@Exclude()
export class SearchResultDTO {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  author: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  imageURL: string;

  @ApiProperty()
  @Expose()
  content: string;

  @ApiProperty()
  @Expose()
  publishedAt: Date;

  @ApiProperty()
  @Expose()
  viewCount: number;

  @ApiProperty()
  @Expose()
  voteCount: number;

  @ApiProperty()
  @Expose()
  category: CategoryDTO;
}
