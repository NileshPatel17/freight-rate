import { LoggerService } from '@nestjs/common';

export interface RequestContent {
  query: boolean;
  params: boolean;
  body: boolean;
  headers: boolean;
  cookies: boolean;
  ip: boolean;
}

export interface Req {
  method: string;
  originalUrl: string;
}
export type OnceFunction = (event: string, listener: () => void) => void;
export interface Res {
  statusCode: number;
  once: OnceFunction;
}
export interface HttpLoggerOptions {
  logger?: LoggerService;
  incomingRequestMessage?: (method: string, url: string) => string;
  completedRequestMessage?: (
    method: string,
    url: string,
    statusCode: number,
    durationMs: string
  ) => string;
}