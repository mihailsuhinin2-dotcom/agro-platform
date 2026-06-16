import { Injectable } from '@nestjs/common';

type Comment = {
  id: number;
  topicId: number;
  text: string;
};

@Injectable()
export class CommentService {
  private comments: Comment[] = [];

  createComment(data: any) {
    const newComment: Comment = {
      id: Date.now(),
      topicId: Number(data.topicId),
      text: data.text,
    };

    this.comments.push(newComment);
    return newComment;
  }

  getByTopic(topicId: number) {
    return this.comments.filter(c => c.topicId === Number(topicId));
  }
}