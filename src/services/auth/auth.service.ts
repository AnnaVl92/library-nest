import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './model';
import { SignUpDto, SignInDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const email = dto.email.toLowerCase();
    const existing = await this.userModel.findOne({ email }).exec();
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const hashed = await hash(dto.password, 10);
    const user = await this.userModel.create({
      email,
      password: hashed,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });

    const payload = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
    };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
      },
    };
  }

  async signIn(dto: SignInDto) {
    const email = dto.email.toLowerCase();
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
    };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
      },
    };
  }
}
