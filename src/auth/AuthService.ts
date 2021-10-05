import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Hasher } from '../bcrypt/Hasher';
import Credentials from '../../entities/Credential';
import User from '../../entities/User';
import { PayloadJwt } from '../../resources';

@Injectable()
export class AuthService {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject('Hasher')
  private readonly hasher: Hasher;

  async checkPassword(plainPassword: string, userInfo: User): Promise<boolean> {
    console.log(plainPassword, userInfo.password);
    return await this.hasher.compare(plainPassword, userInfo.password);
  }

  async makeAccessToken(credential: PayloadJwt): Promise<string> {
    return this.jwtService.sign(credential);
  }

  async generatePassword(password: string): Promise<string> {
    return await this.hasher.generate(password);
  }
}
