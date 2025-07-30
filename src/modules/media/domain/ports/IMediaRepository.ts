import { MediaEntity } from '../entities/media.entity';

export interface IMediaRepository {
  create(payload: Partial<MediaEntity>): Promise<MediaEntity>;

  getAll({ searchText }: { searchText?: string }): Promise<MediaEntity[]>;

  updateById(id: string, payload: any): Promise<MediaEntity>;
}

export const IMediaRepository = Symbol('IMediaRepository');
