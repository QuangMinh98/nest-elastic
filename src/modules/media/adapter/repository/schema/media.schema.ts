import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TMediaName } from 'src/modules/media/domain/types';

export type MediaDocument = Media & Document & { _id: Types.ObjectId };

@Schema()
export class Media {
  @Prop({
    type: Object,
  })
  name: TMediaName;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
