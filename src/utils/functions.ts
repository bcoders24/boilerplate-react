// Capitalize
export const capitalize = (text: string) => {
  return text.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
};

// Title case
export const titleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Object empty
export const isObjectEmpty = (obj: Record<string, any>) => Object.keys(obj).length === 0 && obj.constructor === Object;

// Array empty
export const isArrayEmpty = (arr: []) => arr.length === 0;

// Deep clone
export const deepClone = (obj: unknown) => JSON.parse(JSON.stringify(obj));

// Does object contains specific key
export const doesObjectHaveKey = <T extends Record<string, any>>(obj: T, key: keyof T): boolean => key in obj;

// Pick
export const objectPick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result: Partial<T> = {};
  keys.forEach((key) => {
    result[key] = obj[key];
  });
  return result as Pick<T, K>;
};

// Shuffle Array
export const shuffleArray = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

// unique values
export const uniqueValues = <T>(arr: T[]): T[] => Array.from(new Set(arr));

// Add pair to Object
export function addKeyValuePair<T>(obj: Record<string, T>, key: string, value: T): Record<string, T> {
  return value ? { ...obj, [key]: value } : obj;
}

// Query Params
export function generateQueryParams(params: Record<string, unknown>): string {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== ''),
  );
  const queryString = new URLSearchParams(filteredParams as any).toString();
  return queryString;
}

// Filter Body
export function filterBody(body: Record<string, unknown>): Record<string, unknown> {
  const filteredBody = Object.fromEntries(
    Object.entries(body).filter(([_, value]) => value !== undefined && value !== null && value !== ''),
  );
  return filteredBody;
}
