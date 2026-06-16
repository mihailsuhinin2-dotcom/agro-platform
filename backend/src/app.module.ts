import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForumModule } from './forum/forum.module';
import { CommentModule } from './comment/comment.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [ForumModule, CommentModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
