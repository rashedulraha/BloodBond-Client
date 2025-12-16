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

export interface Donor {
  _id: string;
  name: string;
  email: string;
  bloodGroup: string;
  district: string;
  upazila: string;
  avatar?: string;
  phone?: string;
}

export type bloodDonation = {
  _id: Key | null | undefined;
  recipientName: string;
  bloodGroup: string;
  donationDate?: string;
  donationTime?: string;
  hospitalName?: string;
  recipientDistrict?: string;
  recipientUpazila?: string;
  fullAddressLine?: string;
  requestMessage?: string;
};

export interface DonationRequest {
  _id: string;
  requesterName: string;
  requesterEmail: string;
  recipientName: string;
  recipientDistrict: string;
  recipientUpazila: string;
  hospitalName: string;
  fullAddressLine: string;
  bloodGroup: string;
  donationDate: string;
  donationTime: string;
  requestMessage: string;
  donationStatus: "pending" | "inprogress" | "done" | "canceled";
  donorName?: string;
  donorEmail?: string;
}
