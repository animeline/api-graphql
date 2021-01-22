export const delimiter = ':';

export function toMessageWithCode(code: string, msg?: string): string {
  return `${code}${delimiter} ${msg || ''}`;
}

export const ANIME_NOT_FOUND = 'ANIME_NOT_FOUND';
export const ANIME_CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND';
export const ANIME_LETTER_NOT_FOUND = 'LETTER_NOT_FOUND';

export const UNEXPECTED_ERROR = 'UNEXPECTED_ERROR';
export const DATA_NOT_FOUND = 'DATA_NOT_FOUND';
