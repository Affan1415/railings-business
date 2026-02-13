"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/data/testimonials";

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => { setDirection(1); setCurrentIndex((prev) => (prev + 1) % testimonials.length); }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => { setDirection(-1); setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length); };
  const handleNext = () => { setDirection(1); setCurrentIndex((prev) => (prev + 1) % testimonials.length); };

  const variants = { enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }) };
  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-orange-500 font-medium mb-4 block">TESTIMONIALS</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Don&apos;t just take our word for it. Here&apos;s what homeowners in our community have to say about our work.</p>
        </motion.div>
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center z-10"><Quote className="h-8 w-8 text-orange-500" /></div>
          <div className="bg-background rounded-2xl p-8 lg:p-12 border border-border overflow-hidden relative min-h-[300px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={currentIndex} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }} className="text-center">
                <div className="flex justify-center gap-1 mb-6">{[...Array(currentTestimonial.rating)].map((_, i) => (<svg key={i} className="w-6 h-6 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div>
                <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">&ldquo;{currentTestimonial.text}&rdquo;</p>
                <div><p className="font-semibold text-foreground">{currentTestimonial.name}</p><p className="text-sm text-muted-foreground">{currentTestimonial.location} | {currentTestimonial.service}</p></div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <Button variant="outline" size="icon" onClick={handlePrevious} className="pointer-events-auto rounded-full"><ChevronLeft className="h-5 w-5" /></Button>
              <Button variant="outline" size="icon" onClick={handleNext} className="pointer-events-auto rounded-full"><ChevronRight className="h-5 w-5" /></Button>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">{testimonials.map((_, index) => (<button key={index} onClick={() => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }} className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentIndex ? "bg-orange-500" : "bg-muted"}`} />))}</div>
        </div>
      </div>
    </section>
  );
}
