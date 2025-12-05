import React from "react";
import {
  FaHeart,
  FaHandHoldingHeart,
  FaHospital,
  FaUserMd,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

interface FooterLink {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();

  // Blood donation specific sections
  const quickLinks: FooterLink[] = [
    {
      name: "Find Donors",
      href: "/find-donors",
      icon: <FaUserMd className="w-4 h-4" />,
    },
    {
      name: "Blood Requests",
      href: "/requests",
      icon: <FaHandHoldingHeart className="w-4 h-4" />,
    },
    {
      name: "Donation Centers",
      href: "/centers",
      icon: <FaHospital className="w-4 h-4" />,
    },
    {
      name: "Upcoming Drives",
      href: "/drives",
      icon: <FaCalendarAlt className="w-4 h-4" />,
    },
    { name: "Become Donor", href: "/register/donor" },
    { name: "Organizations", href: "/organizations" },
  ];

  const resources: FooterLink[] = [
    { name: "Donor Eligibility", href: "/eligibility" },
    { name: "Donation Process", href: "/process" },
    { name: "Blood Types Guide", href: "/blood-types" },
    { name: "Health Tips", href: "/health-tips" },
    { name: "FAQ", href: "/faq" },
    { name: "Research", href: "/research" },
  ];

  const aboutUs: FooterLink[] = [
    { name: "Our Mission", href: "/mission" },
    { name: "Our Team", href: "/team" },
    { name: "Partners", href: "/partners" },
    { name: "Careers", href: "/careers" },
    { name: "News & Updates", href: "/news" },
    { name: "Annual Report", href: "/report" },
  ];

  const emergencyContacts = [
    { label: "Emergency Helpline", number: "106" },
    { label: "Blood Bank", number: "+1 (800) 123-HELP" },
    { label: "Ambulance", number: "102" },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook />,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: <FaTwitter />,
      href: "#",
      label: "Twitter",
      color: "hover:text-sky-500",
    },
    {
      icon: <FaInstagram />,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      icon: <FaLinkedin />,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-700",
    },
    {
      icon: <FaYoutube />,
      href: "#",
      label: "YouTube",
      color: "hover:text-red-600",
    },
  ];

  const stats = [
    { label: "Lives Saved", value: "50,000+" },
    { label: "Active Donors", value: "25,000+" },
    { label: "Blood Units", value: "100K+" },
    { label: "Partner Hospitals", value: "500+" },
  ];

  return (
    <footer
      className={`bg-gradient-to-b from-gray-900 to-black text-white ${className}`}>
      {/* Emergency Banner */}
      <div className="bg-red-600 py-3 text-center">
        <div className="container mx-auto px-4">
          <p className="font-semibold flex items-center justify-center gap-2">
            <FaHeart className="animate-pulse" />
            <span>
              URGENT NEED: O- Blood Type • A+ Blood Type • B- Blood Type
            </span>
            <FaHeart className="animate-pulse" />
          </p>
          <p className="text-sm mt-1">
            Call Emergency Helpline: <strong>106</strong>
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 p-3 rounded-full">
                <FaHeart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                  Bloodbond
                </h2>
                <p className="text-red-300 font-medium">
                  Connecting Lives, Saving Lives
                </p>
              </div>
            </div>

            <p className="text-gray-300">
              A lifeline platform connecting blood donors with recipients. Join
              our community of heroes who save lives through voluntary blood
              donation.
            </p>

            {/* Emergency Contacts */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">
                Emergency Contacts
              </h3>
              {emergencyContacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <div className="bg-red-900/30 p-2 rounded">
                    <FaPhone className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{contact.label}</p>
                    <p className="font-bold text-lg text-white">
                      {contact.number}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

       

        {/* Newsletter & Social */}
        <div className="mt-12 pt-8 border-t border-gray-700 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Newsletter */}
          <div className="bg-gray-800/30 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaHeart className="text-red-500" />
              Stay Connected
            </h3>
            <p className="text-gray-300 mb-4">
              Subscribe to receive updates about urgent needs, donation drives,
              and health tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              />
              <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-gray-800/30 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Follow Our Journey</h3>
            <p className="text-gray-300 mb-6">
              Join our community of lifesavers on social media
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`bg-gray-900 text-gray-400 ${social.color} w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 transform hover:scale-110 hover:bg-gray-800`}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/80 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} Bloodbond. All rights reserved.
              <span className="text-red-400 ml-2">❤️ Every Drop Counts</span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
              <a
                href="/safety"
                className="text-gray-400 hover:text-white transition-colors">
                Safety Guidelines
              </a>
            </div>

            <div className="text-xs text-gray-500">
              Registered Non-Profit Organization • Tax ID: 45-1234567
            </div>
          </div>

          {/* Blood Types Disclaimer */}
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              Blood types displayed are for informational purposes. Always
              consult with medical professionals.
              <br />
              This platform connects donors with recipients but does not provide
              medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
