"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceStep } from "./ServiceStep";
import { PropertyStep } from "./PropertyStep";
import { MaterialStep } from "./MaterialStep";
import { AddonsStep } from "./AddonsStep";
import { ContactStep } from "./ContactStep";
import { QuoteDisplay } from "./QuoteDisplay";
import {
  calculateQuote,
  type CalculatorInput,
  type QuoteResult,
  type ServiceType,
  type MaterialTier,
  type PropertyType,
} from "@/lib/calculator/pricing";

const steps = [
  { id: 1, name: "Service", description: "Choose your service" },
  { id: 2, name: "Property", description: "Property details" },
  { id: 3, name: "Materials", description: "Quality tier" },
  { id: 4, name: "Add-ons", description: "Optional upgrades" },
  { id: 5, name: "Contact", description: "Your information" },
  { id: 6, name: "Quote", description: "Your estimate" },
];

export interface CalculatorData {
  service: ServiceType | "";
  propertyType: PropertyType;
  squareFootage: number;
  stories: number;
  currentCondition: "good" | "fair" | "poor";
  needsRemoval: boolean;
  materialTier: MaterialTier;
  addons: string[];
  contact: {
    name: string;
    email: string;
    phone: string;
    address: string;
    preferredContact: string;
    message: string;
  };
}

interface CalculatorWizardProps {
  initialService?: string;
}

export function CalculatorWizard({ initialService }: CalculatorWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [quote, setQuote] = useState<QuoteResult | null>(null);

  const [data, setData] = useState<CalculatorData>({
    service: (initialService as ServiceType) || "",
    propertyType: "residential",
    squareFootage: 2000,
    stories: 1,
    currentCondition: "fair",
    needsRemoval: true,
    materialTier: "better",
    addons: [],
    contact: {
      name: "",
      email: "",
      phone: "",
      address: "",
      preferredContact: "email",
      message: "",
    },
  });

  const updateData = (updates: Partial<CalculatorData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.service !== "";
      case 2:
        return data.squareFootage > 0;
      case 3:
        return data.materialTier !== undefined;
      case 4:
        return true; // Addons are optional
      case 5:
        return (
          data.contact.name.trim() !== "" &&
          data.contact.email.trim() !== "" &&
          data.contact.phone.trim() !== ""
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;

    if (currentStep === 5) {
      // Calculate quote
      const result = calculateQuote({
        service: data.service as ServiceType,
        propertyType: data.propertyType,
        squareFootage: data.squareFootage,
        stories: data.stories,
        materialTier: data.materialTier,
        currentCondition: data.currentCondition,
        needsRemoval: data.needsRemoval,
        addons: data.addons,
      });
      setQuote(result);
    }

    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-border">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Step Indicators */}
          {steps.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors ${
                  currentStep > step.id
                    ? "bg-primary text-white"
                    : currentStep === step.id
                    ? "bg-primary text-white ring-4 ring-primary/20"
                    : "bg-card border-2 border-border text-muted-foreground"
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              <div className="mt-2 text-center hidden sm:block">
                <p
                  className={`text-sm font-medium ${
                    currentStep >= step.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-card rounded-2xl border border-border p-6 md:p-8 min-h-[400px] relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <ServiceStep data={data} updateData={updateData} />
            )}
            {currentStep === 2 && (
              <PropertyStep data={data} updateData={updateData} />
            )}
            {currentStep === 3 && (
              <MaterialStep data={data} updateData={updateData} />
            )}
            {currentStep === 4 && (
              <AddonsStep data={data} updateData={updateData} />
            )}
            {currentStep === 5 && (
              <ContactStep data={data} updateData={updateData} />
            )}
            {currentStep === 6 && quote && (
              <QuoteDisplay quote={quote} contactData={data.contact} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          className={currentStep === 1 ? "invisible" : ""}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {currentStep < 6 && (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-gradient-primary hover:opacity-90"
          >
            {currentStep === 5 ? "Get My Quote" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
