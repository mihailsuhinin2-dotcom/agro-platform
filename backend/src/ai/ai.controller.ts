import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private ai: AiService) {}

  @Post('ask')
  ask(@Body() body: any) {
    return this.ai.ask(body.question);
  }
}