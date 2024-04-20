export enum Environment {
  Development = 'development',
  Production = 'production',
}

export const CURRENT_ENVIRONMENT = process.env.NEXT_PUBLIC_ENV;

export const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export const BACKEND_API_TOKEN = process.env.NEXT_PUBLIC_BACKEND_API_TOKEN;
