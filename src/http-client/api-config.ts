import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development';
const baseURL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: isDevelopment ? '/api/' : baseURL,
});

export const EndPoints = {
  health: 'health',
  hello: 'hello',
} as const;

// create a type out of the object
type EndPointType = typeof EndPoints;

// create a union from the objects keys (SQUARE | CIRCLE)
type EndPointsKeys = keyof EndPointType;

// create a union from the objects values (square | circle)
export type EndPointsValues = EndPointType[EndPointsKeys];

// sample code: const anEndPoint: EndPointsValues = 'heroes';
