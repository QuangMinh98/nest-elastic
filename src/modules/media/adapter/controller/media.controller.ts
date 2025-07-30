import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MediaService } from '../../application/media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  create(@Body() payload: any) {
    return this.mediaService.create(payload);
  }

  @Get()
  getAll(@Query() query: any) {
    return this.mediaService.getAll(query.searchText);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.mediaService.update(id, payload);
  }
}
