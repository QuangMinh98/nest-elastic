import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { ConfigModule } from 'src/config/config.module';
import { IConfigService } from 'src/config/domain/ports/IConfigService';

import { ISearchRepository } from './domain/ports/ISearchRepository';
import { SearchRepository } from './adapter/repository/search.repository';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: IConfigService) => ({
        node: configService.get<string>('elasticNode'),
        auth: {
          apiKey: configService.get<string>('elasticApiKey'),
        },
      }),
      inject: [IConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: ISearchRepository,
      useClass: SearchRepository,
    },
  ],
  exports: [
    {
      provide: ISearchRepository,
      useClass: SearchRepository,
    },
  ],
})
export class SearchModule {}
