export type User = {
  id: number;
  username: string;
  password: string;
  balance: number;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  mainImageUrl: string;
  sellerId: number;
  buyerId: number | null;
  sold: boolean;
};

export type CartProduct = {
  id: number;
  name: string;
  price: number;
};
