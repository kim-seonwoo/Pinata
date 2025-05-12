export interface User {
  id: string;
  name: string;
  email: string;
  ball: number;
  gift?: {
    name: string;
    imageUrl: string;
    receivedAt: string;
  }[];
}
