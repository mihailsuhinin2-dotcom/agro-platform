import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {

  async ask(question: string) {
    // 🔥 ВАЖНО: сейчас заглушка (чтобы работало без API ключа)

    return {
      question,
      answer: `Это ответ ИИ (заглушка): по теме "${question}" рекомендуется проверить влажность почвы и условия полива.`,
    };
  }
}