import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { Role } from "src/common/enum/common.enum";

@Exclude()
export class UserDTO {
  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  role: Role;

  @ApiProperty()
  @Expose()
  photo: string;
}
