export interface ClassRequest {
  title: string;
  content: string;
}

export interface ClassRequestData {
  title: string;
  content: string;
}

export interface ClassRequestResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: ClassRequestData;
  timeStamp: string;
}
