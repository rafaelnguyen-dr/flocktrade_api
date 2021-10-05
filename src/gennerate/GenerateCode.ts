import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Generate } from './Generate';

export default class GenerateCode implements Generate {
  @Inject()
  private readonly config: ConfigService;

  generate(min: number, max: number): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
}
