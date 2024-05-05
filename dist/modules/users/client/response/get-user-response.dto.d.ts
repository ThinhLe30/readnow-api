import { CommonResponse } from 'src/modules/common/Response';
import { UpdateCurrentUserDTO } from '../../dtos/update-current-user.dto';
export declare class GetUserResponseDto implements CommonResponse {
    message: string;
    status: number;
    data: UpdateCurrentUserDTO;
}
