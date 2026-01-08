import { Mail, MapPin, Phone } from "lucide-react";

export const ContactMethodsData = [
  {
    icon: Mail,
    title: "Email Support",
    details: ["support@bloodconnect.org", "info@bloodconnect.org"],
    description: "We typically respond within 24 hours",
    action: "mailto:support@bloodconnect.org",
    color: "text-blue-600",
  },
  {
    icon: Phone,
    title: "Phone Support",
    details: ["+880 1992284845 (Main)", "+880 1712345678 (Emergency)"],
    description: "Available 24/7 for emergencies",
    action: "tel:+8801992284845",
    color: "text-green-600",
  },
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: [
      "BloodConnect HQ, Road 10, Sector 12, Gulshan, Dhaka, Bangladesh",
    ],
    description: "Monday - Friday, 9:00 AM - 6:00 PM",
    action: "#",
    color: "text-red-600",
  },
];
