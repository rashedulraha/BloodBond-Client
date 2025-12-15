import type { Key, ReactNode } from "react";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  date: string;
  category: string;
  slug: string;
}

// all user data fetch type

export interface AllUser {
  status: ReactNode;
  _id: Key | null | undefined;
  name: string;
  email: string;
  bloodGroup: string;
  division: string;
  createAt: string;
  role: string;
  imageURL: string;

  district: string;
}

export type Inputs = {
  userName: string;
  bloodGroup: string;
  district: string;
  division: string;
};
