export const delimiter = ':';

export function toMessageWithCode(code: string, msg?: string): string {
  return `${code}${delimiter} ${msg || ''}`;
}

// anime
export const ANIME_NOT_FOUND = 'ANIME_NOT_FOUND';
export const ANIME_CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND';
export const ANIME_LETTER_NOT_FOUND = 'LETTER_NOT_FOUND';

// user
export const USER_ALREADY_REGISTERED = 'USER_ALREADY_REGISTERED';
export const USER_NOT_EXIST = 'USER_NOT_EXIST';
export const USER_NOT_FOUND = 'USER_NOT_FOUND';
export const USER_INCORRECT_COMBINATION = 'USER_INCORRECT_COMBINATION';

// auth
export const TOKEN_WAS_NO_PROVIED = 'TOKEN_WAS_NO_PROVIED';
export const AUTHENTICATION_TOKEN_INVALID = 'AUTHENTICATION_TOKEN_INVALID';

// fetch
export const UNEXPECTED_ERROR = 'UNEXPECTED_ERROR';
export const DATA_NOT_FOUND = 'DATA_NOT_FOUND';

// cache
export const MANY_REQUESTS = 'MANY_REQUESTS';
