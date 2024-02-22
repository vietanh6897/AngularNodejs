import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import AuthCreadentialsDto from '../dto/auth.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/common/decorators/skipAuth.decorator';
import { ApiException } from 'src/common/swagger/api-exception.swagger';

@Controller('auth')
@ApiTags('auth')
@SkipAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({ description: 'Login successfully.' })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ApiException,
  })
  signIn(@Body() signInDto: AuthCreadentialsDto) {
    return this.authService.login(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @ApiOkResponse({ description: 'Logout successfully.' })
  async logout(@Res() res) {
    return res.status(200).json({ message: 'Logged out successfully' });
  }
}
