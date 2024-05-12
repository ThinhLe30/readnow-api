import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
@Exclude()
export class BasicLogin {
  @IsNotEmpty()
  @Expose()
  email!: string;

  @IsNotEmpty()
  @Expose()
  password!: string;
}
