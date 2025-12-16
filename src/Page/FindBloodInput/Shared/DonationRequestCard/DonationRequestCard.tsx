import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, MapPin, Calendar, Clock, Eye } from "lucide-react";

// Type Definition
interface DonationRequestCardProps {
  recipientName: string;
  location: string; // "Upazila, District" format
  bloodGroup: string;
  date: string; // "2024-12-20" format
  time: string; // "14:30" format
  onViewDetails: () => void;
}

const DonationRequestCard: React.FC<DonationRequestCardProps> = ({
  donationdata,
}) => {
  console.log(donationdata);

  const {
    bloodGroup,
    donationDate,
    donationTime,
    recipientName,
    fullAddressLine,
  } = donationdata || {};
  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-red-300 group">
      <CardContent className="p-6">
        {/* Blood Group Badge - Top */}
        <div className="flex justify-between items-start mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-bold shadow-lg">
            <Droplet className="w-5 h-5" />
            {bloodGroup}
          </div>
        </div>

        {/* Recipient Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
          {recipientName}
        </h3>

        {/* Details */}
        <div className="space-y-3 mb-6">
          {/* Location */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-gray-700">
              {fullAddressLine}
            </p>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-gray-700 font-medium">{donationDate}</p>
          </div>

          {/* Time */}
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-sm text-gray-700 font-medium">{donationTime}</p>
          </div>
        </div>

        {/* View Details Button */}
        <Button
          // onClick={onViewDetails}
          className="w-full bg-linear-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300">
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default DonationRequestCard;
