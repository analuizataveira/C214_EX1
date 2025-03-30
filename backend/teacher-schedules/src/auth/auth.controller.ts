import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singup')
  singup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signup(createAuthDto);
  }

  @Post('singin')
  singin(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.singin(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.authService.findOne(email);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() password: string) {
    return this.authService.update(email, password);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.authService.remove(email);
  }
}
