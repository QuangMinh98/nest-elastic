import { Module } from '@nestjs/common';
import { MediaService } from './application/media.service';
import { MediaController } from './adapter/controller/media.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from './adapter/repository/schema/media.schema';
import { IMediaRepository } from './domain/ports/IMediaRepository';
import { MediaRepository } from './adapter/repository/media.repository';
import { SearchMediaDecorator } from './adapter/repository/searchMedia.decorator';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]), SearchModule],
  controllers: [MediaController],
  providers: [
    MediaService,
    {
      provide: IMediaRepository,
      useClass: MediaRepository,
    },
    {
      provide: 'SearchMediaDecorator',
      useClass: SearchMediaDecorator,
    },
  ],
})
export class MediaModule {}
