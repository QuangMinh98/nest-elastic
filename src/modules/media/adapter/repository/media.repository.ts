import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Media, MediaDocument } from './schema/media.schema';
import { Model } from 'mongoose';
import { MediaEntity } from '../../domain/entities/media.entity';
import { IMediaRepository } from '../../domain/ports/IMediaRepository';

@Injectable()
export class MediaRepository implements IMediaRepository {
  constructor(@InjectModel(Media.name) private readonly _model: Model<MediaDocument>) {}

  async create(payload: Partial<MediaEntity>) {
    const createdDocument = await this._model.create(payload);

    return this._mapToEntity(createdDocument);
  }

  async getAll({ searchText }: { searchText?: string }) {
    const records = await this._model.find({
      'name.english': { $regex: new RegExp(['', searchText, ''].join(''), 'i') },
    });

    return records.map(this._mapToEntity);
  }

  async updateById(id: string, payload: any) {
    const result = await this._model.findByIdAndUpdate(id, payload, { new: true });

    return this._mapToEntity(result);
  }

  private _mapToEntity(document: MediaDocument): MediaEntity {
    return {
      id: document._id.toString(),
      name: {
        romaji: document.name.romaji,
        english: document.name.english,
        userPreferred: document.name.userPreferred,
        native: document.name.native,
      },
    };
  }
}
