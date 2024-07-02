export interface Users {
  totalPages: number;
  currentPage: number;
  users: User[];
}

export interface User {
  role: string;
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  __v: number;
  username: string;
  postCount: number;
}
