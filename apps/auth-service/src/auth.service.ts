import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/src/prisma.service';
import { KafkaService } from 'libs/kafka/kafka.service';
import { LoginDto, RegisterDto } from 'libs/shared/dto/auth.dto';
import { User } from 'libs/shared/interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly kafkaService: KafkaService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...registerDto,
        password: hashedPassword,
      },
    });

    await this.kafkaService.emit('user.registered', { userId: user.id });

    return this.prisma.user.findUnique({ where: { id: user.id } });
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.kafkaService.emit('user.login', { userId: user.id });

    return this.generateToken(user);
  }

  async logout(user: any) {
    await this.kafkaService.emit('user.logout', { userId: user.userId });
    return { message: 'Logged out successfully' };
  }

  private generateToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
