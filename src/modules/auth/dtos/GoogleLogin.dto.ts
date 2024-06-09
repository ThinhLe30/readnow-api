import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
@Exclude()
export class GoogleLogin {
  @IsNotEmpty()
  @Expose()
  email!: string;

  @IsNotEmpty()
  @Expose()
  name!: string;

  @IsNotEmpty()
  @Expose()
  photo?: string;

  @IsNotEmpty()
  @Expose()
  authID?: string;
}
