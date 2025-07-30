import { Inject, Injectable } from '@nestjs/common';
import { IMediaRepository } from '../../domain/ports/IMediaRepository';
import { ISearchRepository } from 'src/modules/search/domain/ports/ISearchRepository';
import { MediaEntity } from '../../domain/entities/media.entity';

@Injectable()
export class SearchMediaDecorator implements IMediaRepository {
  constructor(
    @Inject(ISearchRepository) private readonly searchRepository: ISearchRepository,
    @Inject(IMediaRepository) private readonly mediaRepository: IMediaRepository,
  ) {}

  async create(payload: Partial<MediaEntity>): Promise<MediaEntity> {
    const result = await this.mediaRepository.create(payload);
    await this.searchRepository.indexProduct({ index: 'media', id: result.id, payload: result });

    return result;
  }

  getAll(payload: { searchText?: string }): Promise<MediaEntity[]> {
    if (!payload.searchText) {
      return this.mediaRepository.getAll(payload);
    }

    return this.searchRepository.search({
      index: 'media',
      searchText: payload.searchText,
      fields: ['name.romaji', 'name.english', 'userPreferred', 'name.native'],
    });
  }

  async updateById(id: string, payload: any): Promise<MediaEntity> {
    const result = await this.mediaRepository.updateById(id, payload);
    if (result) {
      await this.searchRepository.update({ index: 'media', payload: result, id });
    }

    return result;
  }
}
