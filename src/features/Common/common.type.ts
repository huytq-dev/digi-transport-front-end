export interface ApiResponse<T = unknown> {
  Type: string;
  Title: string;
  Status: number;
  Detail: string;
  Errors: Record<string, string[]>;
  Data: T | null;
}

export function apiResponseOk<T = unknown>(message: string): ApiResponse<T> {
  return {
    Type: 'SUCCESS',
    Title: 'Success',
    Status: 200,
    Detail: message,
    Errors: {},
    Data: null,
  };
}

export function apiResponseOkWithData<T>(
  data: T,
  detail: string = 'Success'
): ApiResponse<T> {
  return {
    Type: 'SUCCESS',
    Title: 'Success',
    Status: 200,
    Detail: detail,
    Errors: {},
    Data: data,
  };
}

export function apiResponseError<T = unknown>(
  type: string,
  title: string,
  status: number,
  detail: string,
  errors?: Record<string, string[]>
): ApiResponse<T> {
  return {
    Type: type,
    Title: title,
    Status: status,
    Detail: detail,
    Errors: errors || {},
    Data: null,
  };
}

export function isApiResponseSuccess<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { Data: T } {
  return response.Type === 'SUCCESS' && response.Status >= 200 && response.Status < 300;
}

export function isApiResponseError<T>(
  response: ApiResponse<T>
): boolean {
  return response.Type !== 'SUCCESS' || response.Status >= 400;
}

export function getApiErrorMessage<T>(response: ApiResponse<T>): string {
  if (response.Detail) {
    return response.Detail;
  }
  
  if (Object.keys(response.Errors).length > 0) {
    const firstError = Object.values(response.Errors)[0];
    return firstError?.[0] || 'An error occurred';
  }
  
  return response.Title || 'Unknown error';
}
