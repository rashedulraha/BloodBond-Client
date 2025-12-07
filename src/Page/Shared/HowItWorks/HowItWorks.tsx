import {
  FaUserPlus,
  FaSearch,
  FaHandHoldingHeart,
  FaHeartbeat,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-3xl" />,
      title: "Register as Donor",
      description:
        "Create your account with your blood group and location details to become part of our life-saving community.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <FaSearch className="text-3xl" />,
      title: "Find Requests",
      description:
        "Browse blood donation requests in your area or get notified when someone needs your blood type.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <FaHandHoldingHeart className="text-3xl" />,
      title: "Donate Blood",
      description:
        "Respond to donation requests, schedule your donation, and make a difference in someone's life.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <FaHeartbeat className="text-3xl" />,
      title: "Save Lives",
      description:
        "Your donation can save up to three lives. Track your impact and become a hero in your community.",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our platform in four simple steps and start making a
            life-saving difference today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-card rounded-md shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div
                className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
              <div className="mt-4 flex justify-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-linear-to-r from-primary/10 to-primary/5 rounded-md p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Save Lives?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of donors who are making a difference in their
              communities. Your donation can save lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all">
                Register Now
              </button>
              <button className="btn btn-outline rounded-full px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
