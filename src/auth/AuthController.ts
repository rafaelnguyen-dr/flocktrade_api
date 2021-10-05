import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './AuthService';
import { PayloadRegister } from '../../resources';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../entities/User';
import { v4 as uuidv4 } from 'uuid';
import { getManager, Transaction, TransactionManager } from 'typeorm';
import { CredentialRepository } from '../../entities/Credential';
import { InjectSlack } from 'nestjs-slack-webhook';
import { Generate } from '../gennerate/Generate';

@Controller()
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Inject()
  private readonly config: ConfigService;

  @Inject()
  private readonly UserRepository: UserRepository;

  @InjectSlack()
  private readonly slack: any;

  @Inject('Gen')
  private readonly gen: Generate;

  @Post('login')
  @HttpCode(200)
  async login(
    @Request() req,
  ): Promise<{ access_token: string; username: string }> {
    const { username, password } = req.body.input;

    const user = await this.UserRepository.findOne({
      email: username,
    });

    if (!user) {
      throw 'USER_NOT_FOUND';
    }

    const isSamePassword = await this.authService.checkPassword(password, user);

    if (!isSamePassword) {
      throw 'PASSWORD_WRONG';
    }

    const actions = {
      1: 'user',
      2: 'admin',
    };

    return {
      username: user.email,
      access_token: await this.authService.makeAccessToken({
        user_id: user?.id,
        email: user?.email,
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['user', 'admin'],
          'x-hasura-default-role': 'user',
          'x-hasura-role': 'user',
          'x-hasura-user-id': user.id,
          'x-hasura-org-id': '123',
          'x-hasura-custom': 'custom-value',
        },
      }),
    };
  }

  @Post('login/google')
  @HttpCode(200)
  async loginGoogle(
    @Request() req,
  ): Promise<{ access_token: string; username: string }> {
    const { email } = req.body.input;

    const user = await this.UserRepository.findOne({
      email,
    });

    if (!user) {
      //todo auto register by account
    }

    return {
      username: user.email,
      access_token: await this.authService.makeAccessToken({
        user_id: user?.id,
        email: user?.email,
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['user', 'admin'],
          'x-hasura-default-role': 'user',
          'x-hasura-role': 'user',
          'x-hasura-user-id': user.id,
          'x-hasura-org-id': '123',
          'x-hasura-custom': 'custom-value',
        },
      }),
    };
  }

  @Post('register')
  async register(@Request() req) {
    const { email, password, name, phone_number } = req.body.input.payload;

    const userDb = await this.UserRepository.findOne({
      email,
    });

    if (userDb) {
      throw 'User already exists';
    }

    const code = this.gen.generate(1000, 9999);

    const user = await this.UserRepository.save({
      id: uuidv4(),
      code,
      phone_number,
      name,
      email,
      password: await this.authService.generatePassword(password),
    });

    await this.slack.send(`Code : ${code}`);

    return user;
  }
}
