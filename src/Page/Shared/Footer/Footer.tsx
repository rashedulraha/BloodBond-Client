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
      color: "hover:text-primary",
    },
    {
      icon: <FaTwitter />,
      href: "#",
      label: "Twitter",
      color: "hover:text-primary",
    },
    {
      icon: <FaInstagram />,
      href: "#",
      label: "Instagram",
      color: "hover:text-accent",
    },
    {
      icon: <FaLinkedin />,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-primary",
    },
    {
      icon: <FaYoutube />,
      href: "#",
      label: "YouTube",
      color: "hover:text-destructive",
    },
  ];

  const stats = [
    { label: "Lives Saved", value: "50,000+" },
    { label: "Active Donors", value: "25,000+" },
    { label: "Blood Units", value: "100K+" },
    { label: "Partner Hospitals", value: "500+" },
  ];

  return (
    <footer className={`bg-background text-foreground ${className}`}>
      {/* Emergency Banner */}
      <div className="bg-destructive py-3 text-center">
        <div className="container mx-auto px-4">
          <p className="font-semibold flex items-center justify-center gap-2">
            <FaHeart className="animate-pulse text-primary-foreground" />
            <span>
              URGENT NEED: O- Blood Type • A+ Blood Type • B- Blood Type
            </span>
            <FaHeart className="animate-pulse text-primary-foreground" />
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
              <div className="bg-primary p-3 rounded-full">
                <FaHeart className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-primary">Bloodbond</h2>
                <p className="text-accent font-medium">
                  Connecting Lives, Saving Lives
                </p>
              </div>
            </div>

            <p className="text-muted-foreground">
              A lifeline platform connecting blood donors with recipients. Join
              our community of heroes who save lives through voluntary blood
              donation.
            </p>

            {/* Emergency Contacts */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                Emergency Contacts
              </h3>
              {emergencyContacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-card/50 rounded-lg">
                  <div className="bg-destructive/30 p-2 rounded">
                    <FaPhone className="w-4 h-4 text-destructive-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {contact.label}
                    </p>
                    <p className="font-bold text-lg text-foreground">
                      {contact.number}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-primary inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground hover:translate-x-2 transition-all duration-300 group">
                    {link.icon && (
                      <span className="text-primary group-hover:scale-110 transition-transform">
                        {link.icon}
                      </span>
                    )}
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-primary inline-block">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground hover:translate-x-2 transition-all duration-300 block py-1">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="font-semibold mb-4 text-foreground">Our Impact</h4>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-3 bg-card/30 rounded-lg">
                    <p className="text-2xl font-bold text-accent-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & About */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-primary inline-block">
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Headquarters</p>
                    <p className="text-muted-foreground text-sm">
                      123 Lifeline Plaza, Health District, City 10001
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:contact@bloodbond.org"
                      className="text-muted-foreground hover:text-foreground text-sm">
                      contact@bloodbond.org
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-primary inline-block">
                About Bloodbond
              </h3>
              <ul className="space-y-3">
                {aboutUs.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 block py-1">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter & Social */}
        <div className="mt-12 pt-8 border-t border-border grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Newsletter */}
          <div className="bg-card/30 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaHeart className="text-primary" />
              Stay Connected
            </h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to receive updates about urgent needs, donation drives,
              and health tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
              />
              <button className="bg-primary hover:bg-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-card/30 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Follow Our Journey</h3>
            <p className="text-muted-foreground mb-6">
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
                  className={`bg-card text-muted-foreground ${social.color} w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 transform hover:scale-110 hover:bg-card`}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-card/80 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} Bloodbond. All rights reserved.
              <span className="text-accent ml-2">❤️ Every Drop Counts</span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <a
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </a>
              <a
                href="/safety"
                className="text-muted-foreground hover:text-foreground transition-colors">
                Safety Guidelines
              </a>
            </div>

            <div className="text-xs text-muted-foreground">
              Registered Non-Profit Organization • Tax ID: 45-1234567
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
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
