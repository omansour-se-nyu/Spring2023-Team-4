export type User = {
  id: number;
  username: string;
  password: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  mainImageUrl: string;
  userId: number;
};
