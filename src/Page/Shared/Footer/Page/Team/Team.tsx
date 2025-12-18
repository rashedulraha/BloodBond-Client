import React from "react";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import Container from "@/Page/Shared/Responsive/Container";
import { Button } from "@/components/ui/button";

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Ahmed",
      role: "Medical Director",
      image: "https://i.ibb.co/vY6syY7/doctor1.jpg",
      bio: "Hematology expert with 10+ years of experience in blood transfusion safety.",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Alex Rivera",
      role: "Lead Developer",
      image: "https://i.ibb.co/m0f6mXf/dev1.jpg",
      bio: "Full-stack engineer passionate about building tech for social impact.",
      social: { github: "#", linkedin: "#" },
    },
    {
      name: "Tanvir Hossain",
      role: "Volunteer Coordinator",
      image: "https://i.ibb.co/Kj8fHq0/volunteer1.jpg",
      bio: "Dedicated to managing our nationwide network of 5,000+ donors.",
      social: { twitter: "#", linkedin: "#" },
    },
    {
      name: "Elena Rodriguez",
      role: "UI/UX Designer",
      image: "https://i.ibb.co/G7s3zS3/designer1.jpg",
      bio: "Crafting seamless and empathetic experiences for donors and recipients.",
      social: { github: "#", twitter: "#" },
    },
  ];

  return (
    <div className="min-h-screen text-foreground">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Heart className="text-primary animate-pulse" size={32} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Meet Our <span className="text-primary">Life Savers</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            The dedicated team of healthcare professionals and tech enthusiasts
            working tirelessly to ensure blood is available for everyone.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="group bg-card/50 border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-all shadow-sm hover:shadow-xl">
              {/* Image Container */}
              <div className="aspect-square overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2 italic">
                  "{member.bio}"
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="text-muted-foreground hover:text-primary transition-colors">
                      <Github size={18} />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin size={18} />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="text-muted-foreground hover:text-primary transition-colors">
                      <Twitter size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Us Section */}
        <div className="bg-primary p-1 rounded-lg">
          <div className="bg-background border border-primary/20 p-8 md:p-12 rounded-[calc(var(--radius)-4px)] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2 tracking-tight">
                Want to join our mission?
              </h2>
              <p className="text-muted-foreground">
                We are always looking for passionate volunteers and
                professionals.
              </p>
            </div>
            <div className="flex gap-4">
              <Button size="lg">Apply Now</Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Mail size={18} /> Contact Us
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Team;
