import request from '@/utils/request';

export const login = (
  username: string,
  password: string
): Promise<{
  code: number;
  codeMsg: string;
  token: string;
}> => {
  return request.post('/api/users/login', {
    email: username,
    password,
  });
};

export const getUserInfo = (): Promise<{
  code: number;
  codeMsg: string;
  token: string;
}> => {
  return request.get('/api/users/tokenValid');
};
