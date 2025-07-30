import { Injectable } from '@nestjs/common';
import { IConfigService } from './domain/ports/IConfigService';

@Injectable()
export class ConfigService implements IConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      connectionString: process.env.CONNECTION_STRING,
      elasticNode: process.env.ELASTIC_NODE,
      elasticApiKey: process.env.ELASTIC_API_KEY,
    };
  }

  get<T>(key: string): T {
    return this.envConfig[key];
  }
}
