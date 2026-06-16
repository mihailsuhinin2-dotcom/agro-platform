import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private service: CommentService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.createComment(body);
  }

  @Get(':topicId')
  get(@Param('topicId') topicId: string) {
    return this.service.getByTopic(Number(topicId));
  }
}