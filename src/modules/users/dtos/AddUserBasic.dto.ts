import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

@Exclude()
export class AddUserBasicDTO {
  @ApiProperty()
  @Expose()
  @IsNotEmpty({ message: "Email cannot be null" })
  @IsEmail({}, { message: "Invalid email" })
  email!: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty({ message: "Password cannot be null" })
  password!: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty({ message: "Name cannot be null" })
  name!: string;
}
