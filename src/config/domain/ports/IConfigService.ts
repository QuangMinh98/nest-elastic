export interface IConfigService {
  get<T>(key: string): T;
}

export const IConfigService = Symbol('IConfigService');
