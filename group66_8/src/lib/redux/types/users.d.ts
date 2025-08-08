export interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
}
export interface UpdateUserPayload {
  full_name: string;
  role: string;
}
export interface CreateUserPayload {
  id: string;
  full_name: string;
  email: string;
  role: string;
  message: string;
}

export interface DeleteUserPayload {
  full_name: string;
  id: stirng;
}

export interface GetusersResponse {
  success: boolean;
  data: {
    users: User[];
    count: number;
    total_count: number;
    page: number;
    limit: number;
  };
  message: string;
}

export type GetUsersParams = {
  page?: number;
  limit?: number;
};
