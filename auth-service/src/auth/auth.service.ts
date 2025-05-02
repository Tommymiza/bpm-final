import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { compareSync } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { email },
      });
      const isValidPassword = compareSync(password, user.password);
      if (!isValidPassword) throw new Error('Mot de passe invalide !');
      const token = this.jwt.sign({ id: user.id, role: user.role });
      return {
        token,
      };
    } catch (error) {
      console.log(error);
      throw new RpcException('Invalid credentials.');
    }
  }

  async check(jwtToken: string) {
    try {
      const payload = this.jwt.verify(jwtToken, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      console.log(error);
      throw new RpcException('Invalid token.');
    }
  }
}
