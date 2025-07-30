export type TMediaName = {
  romaji: string;
  english: string;
  userPreferred: string;
  native: string;
};

export type TCreateMediaPayload = {
  name: TMediaName;
};

export type TUpdateMediaPayload = Partial<TCreateMediaPayload>;
