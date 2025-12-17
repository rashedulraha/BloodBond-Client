import type { Key, ReactNode } from "react";
import type { JSX } from "react/jsx-runtime";

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
export interface AllRequester {
  recipientName: string;
  _id: string;
  imageURL: string;
  recipientEmail: string;
  donationDate: string;
  donationTime: string;
  hospitalName: string;
  recipientDistrict: string;
  fullAddressLine: string;
  requestMessage: string;
  requesterEmail: string;
  bloodGroup: string;
  requesterName: string;
  donationStatus: string;
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
  recipientDivision: string;
  recipientDistrict: string;
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

export type RegisterInput = {
  name: string;
  email: string;
  avatar: FileList;
  bloodGroup: string;
  division: string;
  district: string;
  upazila: string;
  password: string;
  confirmPassword: string;
};

//  bangla division type
export type banglaDivision = {
  map(arg0: (d: any) => JSX.Element): ReactNode;
  id: string;
  name: string;
  bn_name: string;
  url: string;
};

export interface District {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  lon: string;
  url: string;
}

//!  registration type

export type registration = {
  name: string;
  email: string;
  avatar: FileList;
  bloodGroup: string;
  division: string;
  district: string;
  password: string;
  confirmPassword: string;
};

export interface CtaButtonProps {
  to: string;
  label: string;
  Icon: React.ElementType;
  variant: "primary" | "secondary";
}

