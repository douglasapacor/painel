export type defaultResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};
