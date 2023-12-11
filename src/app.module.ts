import { Module } from '@nestjs/common';
import { MessagesModule } from './module/messages/messages.module';
import { ResponsesModule } from './module/responses/responses.module';

@Module({
  imports: [MessagesModule, ResponsesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
