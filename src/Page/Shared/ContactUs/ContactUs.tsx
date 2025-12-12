import { useState, type ChangeEvent } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Container from "../Responsive/Container";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleInputChange(_event: ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <section className="my-10">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or want to get involved? Reach out to our team and
            we'll be happy to help.
          </p>
        </div>

        <div className="flex items-center justify-between flex-col md:flex-row gap-12 pt-10">
          {/* Contact Form */}
          <div className="bg-card rounded-md shadow-lg flex-1 w-ful p-6 md:p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="mb-1">Your Name</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Rashedul Islam"
                />
              </div>

              <div>
                <Label className="mb-1">Email Address</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="rashedul@example.com"
                />
              </div>

              <div>
                <Label className=" mb-1">Subject</Label>
                <Input
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <Label className="mb-1">Your Message</Label>
                <Textarea
                  value={formData.message}
                  rows={5}
                  placeholder="Type your message here..."></Textarea>
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          <div className="h-full w-full flex-1">
            {/* Map Placeholder */}
            <div className="bg-card rounded-md shadow-lg overflow-hidden">
              <div className="h-full bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-4xl text-primary mx-auto mb-2" />
                  <p className="text-foreground font-medium">Our Location</p>
                  <p className="text-muted-foreground text-sm">
                    Map will be displayed here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactUs;
