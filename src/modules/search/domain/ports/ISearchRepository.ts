export interface ISearchRepository {
  indexProduct<T>(payload: { index: string; id: string; payload: T }): Promise<unknown>;

  search<T>(payload: { index: string; searchText: string; fields: string[] }): Promise<T[]>;

  update<T>(payload: { index: string; id: string; payload: T }): Promise<unknown>;

  remove(index: string, id: string): Promise<unknown>;
}

export const ISearchRepository = Symbol('ISearchRepository');
