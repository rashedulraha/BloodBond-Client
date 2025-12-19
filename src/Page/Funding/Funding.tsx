import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Trophy, ArrowRight, Coins, ShieldCheck } from "lucide-react";

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

type FormData = {
  amount: number;
};

const Funding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const topDonors = [
    { id: 1, name: "Ariful Islam", amount: 5000, title: "Grand Patron" },
    { id: 2, name: "Mahim Ahmed", amount: 3500, title: "Platinum Donor" },
    { id: 3, name: "Rahat Kabir", amount: 2000, title: "Gold Sponsor" },
  ];

  const suggestedAmounts = [10, 25, 50, 100, 250];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setValue("amount", amount);
  };

  const onSubmit = (data: FormData) => {
    console.log("Submitting fund data:", data.amount);
    toast.success(`Redirecting to payment for $${data.amount}`);
    reset();
    setSelectedAmount(null);
    setIsModalOpen(false);
  };

  return (
    <Container>
      <div className="space-y-16">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black leading-tight bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Fuel the <span className="text-primary">Mission</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Every dollar you contribute helps us maintain our blood bank
            operations and reach donors faster in emergencies.
          </p>

          <div className="pt-4">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg group cursor-pointer">
                  Give Fund{" "}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card text-card-foreground border-border rounded-xl shadow-xl max-w-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black flex items-center gap-2">
                      <Coins className="w-6 h-6 text-primary" /> Make a Donation
                    </DialogTitle>
                  </DialogHeader>

                  <div className="py-6 space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="amount" className="text-base font-bold">
                        Contribution Amount (USD)
                      </Label>

                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {suggestedAmounts.map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={
                              selectedAmount === amount ? "default" : "outline"
                            }
                            className="h-10"
                            onClick={() => handleAmountSelect(amount)}>
                            ${amount}
                          </Button>
                        ))}
                      </div>

                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">
                          ${" "}
                        </span>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          className={`w-full pl-8 h-12 ${
                            errors.amount ? "border-destructive" : ""
                          }`}
                          {...register("amount", {
                            required: "Amount is required",
                            min: { value: 1, message: "Min $1" },
                          })}
                        />
                      </div>
                      {errors.amount && (
                        <p className="text-destructive text-sm font-medium">
                          Please enter a valid amount (Min $1)
                        </p>
                      )}
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="submit"
                      className="w-full h-12 font-bold"
                      disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          Secure Checkout{" "}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-12">
          <div className="flex flex-col items-center gap-2">
            <Trophy className="text-primary w-10 h-10 mb-2" />
            <h2 className="text-3xl font-black capitalize">Wall of Honor</h2>
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topDonors.map((donor, index) => (
              <Card
                key={donor.id}
                className="bg-card/70 text-card-foreground border border-secondary shadow-md hover:shadow-lg hover:border-primary/50 transition-all duration-300 rounded-xl overflow-hidden transform hover:-translate-y-1"
                style={{ transitionDelay: `${index * 100}ms` }}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <ShieldCheck className="text-primary w-6 h-6" />
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground bg-muted px-2 py-1 rounded">
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
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-primary">
                      ${donor.amount.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">USD</span>
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
