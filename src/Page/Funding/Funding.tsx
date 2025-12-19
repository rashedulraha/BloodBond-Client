import { useState } from "react";
import { toast } from "sonner";
import { Trophy, Heart, ArrowRight, Coins, ShieldCheck } from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Container from "../Shared/Responsive/Container";

const Funding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const topDonors = [
    { id: 1, name: "Ariful Islam", amount: 5000, title: "Grand Patron" },
    { id: 2, name: "Mahim Ahmed", amount: 3500, title: "Platinum Donor" },
    { id: 3, name: "Rahat Kabir", amount: 2000, title: "Gold Sponsor" },
  ];

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting fund data:", amount);
    toast.success(`Redirecting to payment for $${amount}`);
    setIsModalOpen(false);
  };

  return (
    <Container>
      <div className="space-y-16">
        {/* Hero Section with Theme Primary Color */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm border border-primary/20">
            <Heart className="w-4 h-4 fill-current" /> Together we can save
            lives
          </div>

          <h1 className="text-5xl md:text-7xl font-black  leading-tight">
            Fuel the <span className="text-primary">Mission</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl">
            Every dollar you contribute helps us maintain our blood bank
            operations and reach donors faster in emergencies.
          </p>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                Give Fund <ArrowRight className="w-6 h-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card text-card-foreground border-border rounded-lg">
              <form onSubmit={handlePaymentSubmit}>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black flex items-center gap-2">
                    <Coins className="w-6 h-6 text-primary" /> Make a Donation
                  </DialogTitle>
                </DialogHeader>
                <div className="py-8 space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="amount" className="text-base font-bold">
                      Contribution Amount (USD)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">
                        $
                      </span>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        className="w-full pl-8"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full ">
                    Secure Checkout
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Top Contributors Section */}
        <div className="space-y-10">
          <div className="flex flex-col items-center gap-2">
            <Trophy className="text-primary w-10 h-10 mb-2" />
            <h2 className="text-3xl font-black uppercase tracking-tighter">
              Wall of Honor
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topDonors.map((donor) => (
              <Card
                key={donor.id}
                className="bg-card/50 text-card-foreground border border-secondary shadow-sm hover:border-primary/50 transition-colors rounded-lg overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <ShieldCheck className="text-primary w-6 h-6" />
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                      {donor.title}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div>
                    <h3 className="text-2xl font-black truncate">
                      {donor.name}
                    </h3>
                    <p className="text-muted-foreground text-sm font-medium">
                      Top Contributor
                    </p>
                  </div>
                  <div className="text-4xl font-black text-primary">
                    ${donor.amount.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Funding;
