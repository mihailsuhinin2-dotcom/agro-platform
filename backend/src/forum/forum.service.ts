import { Injectable } from '@nestjs/common';

type Topic = {
  id: number;
  title?: string;
  description?: string;
};

@Injectable()
export class ForumService {

  private topics: Topic[] = []; // 👈 ВОТ ГЛАВНОЕ ИСПРАВЛЕНИЕ

  createTopic(topic: any) {
    const newTopic: Topic = {
      id: Date.now(),
      ...topic,
    };

    this.topics.push(newTopic);
    return newTopic;
  }

  getTopics() {
    return this.topics;
  }
}