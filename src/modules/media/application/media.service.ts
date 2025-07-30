import { Inject, Injectable } from '@nestjs/common';
import { IMediaRepository } from '../domain/ports/IMediaRepository';
import { TCreateMediaPayload, TUpdateMediaPayload } from '../domain/types';

@Injectable()
export class MediaService {
  constructor(@Inject('SearchMediaDecorator') private readonly mediaRepository: IMediaRepository) {}

  create(payload: TCreateMediaPayload) {
    return this.mediaRepository.create({
      name: payload.name,
    });
  }

  getAll(searchText?: string) {
    return this.mediaRepository.getAll({ searchText });
  }

  update(id: string, payload: TUpdateMediaPayload) {
    return this.mediaRepository.updateById(id, payload);
  }
}
