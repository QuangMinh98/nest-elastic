import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { MediaModule } from './modules/media/media.module';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [ConfigModule, DatabaseModule, MediaModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
