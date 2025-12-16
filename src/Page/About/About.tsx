import React from "react";
import {
  HeartHandshake,
  Zap,
  Shield,
  Target,
  Users,
  Droplet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "../Shared/Responsive/Container";

const About: React.FC = () => {
  const mission =
    "To create a seamless, efficient, and reliable platform that bridges the gap between voluntary blood donors and those in critical need, ensuring timely access to life-saving resources across the nation.";

  const teamStats = [
    {
      icon: Droplet,
      number: "5,000+",
      label: "Successful Donations Facilitated",
    },
    { icon: Users, number: "10,000+", label: "Registered Active Donors" },
    { icon: HeartHandshake, number: "150+", label: "Dedicated Volunteers" },
  ];

  const principles = [
    {
      icon: HeartHandshake,
      title: "Compassion",
      description:
        "Driving every interaction with empathy and a profound respect for human life.",
    },
    {
      icon: Zap,
      title: "Efficiency",
      description:
        "Ensuring blood requests are processed and matched instantly using smart technology.",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "Maintaining the highest standards of data privacy and medical integrity for all users.",
    },
  ];

  return (
    <Container>
      <div className="space-y-12">
        {/* --- [ 1. Header & Mission ] --- */}
        <div className="text-center pb-4 border-b border-border">
          <h1 className="text-5xl font-extrabold text-primary mb-4 animate-in fade-in zoom-in duration-500">
            Our Mission: Saving Lives Together
          </h1>
          <p className="text-lg text-foreground max-w-3xl mx-auto font-medium">
            {mission}
          </p>
        </div>

        {/* --- [ 2. Core Principles/Values Section ] --- */}
        <div className="space-y-4 pt-4">
          <h2 className="text-3xl font-bold text-center text-foreground flex items-center justify-center">
            <Target className="w-6 h-6 mr-3 text-primary" /> Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
            {principles.map((p, index) => (
              <div
                key={index}
                className="p-6 rounded-md bg-card/50 border border-border  hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}>
                <p.icon className="w-10 h-10 mx-auto text-primary mb-3" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {p.title}
                </h3>
                <p className="text-muted-foreground text-sm">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- [ 3. Impact & Statistics Section ] --- */}
        <div className="bg-card/50 p-8 rounded-xl shadow-xl border border-secondary/80">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Our Impact at a Glance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {teamStats.map((stat, index) => (
              <div key={index} className="text-center p-4">
                <stat.icon className="w-12 h-12 mx-auto text-destructive mb-3" />
                <p className="text-5xl font-extrabold text-primary">
                  {stat.number}
                </p>
                <p className="text-lg font-medium text-foreground mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- [ 4. Call to Action ] --- */}
        <div className="text-center py-6">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Be the reason someone survives today.
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our mission. Whether you need blood, can donate, or want to
            volunteer, your contribution saves lives.
          </p>
          <Button
            onClick={() => {
              /* Navigate to Registration or Donor Search page */
            }}
            className="cursor-pointer">
            Join Our Donor Community
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default About;
