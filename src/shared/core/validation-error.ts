export interface ErrorInfo {
  message: string;
  code: string;
}

export class ValidationError extends Error {
  info: ErrorInfo;

  constructor(info: ErrorInfo, ...params) {
    super(...params);

    this.name = 'ValidationError';
    this.info = info;
  }
}
