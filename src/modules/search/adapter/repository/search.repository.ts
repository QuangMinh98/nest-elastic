import { Injectable } from '@nestjs/common';
import { ISearchRepository } from '../../domain/ports/ISearchRepository';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchRepository implements ISearchRepository {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexProduct<T>({ index, payload, id }: { index: string; id: string; payload: T }) {
    return this.elasticsearchService.index({
      index,
      id,
      body: payload,
    });
  }

  async search<T>(payload: { index: string; searchText: string; fields: string[] }): Promise<T[]> {
    const queryBody: Record<string, any> = {
      query: {
        multi_match: {
          query: payload.searchText,
          fields: payload.fields,
        },
      },
    };

    const result = await this.elasticsearchService.search({
      index: payload.index,
      body: queryBody,
    });

    return result.hits.hits.map((item: any) => item._source);
  }

  async update<T>(payload: { index: string; id: string; payload: T }) {
    return this.elasticsearchService.index({
      index: payload.index,
      id: payload.id,
      body: payload.payload,
    });
  }

  async remove(index: string, id: string) {
    return this.elasticsearchService.delete({
      index,
      id,
    });
  }
}
