"use client";

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote: "MutedBox transformed our team's feedback culture. People share honest thoughts without fear of judgment.",
    author: "Sarah Johnson",
    position: "Product Manager at TechCorp",
    image: "/images/testimonial-1.jpg"
  },
  {
    quote: "I've tried several feedback tools, but nothing compares to the honesty we get through MutedBox's anonymous system.",
    author: "Michael Chen",
    position: "Team Lead at InnovateX",
    image: "/images/testimonial-2.jpg"
  },
  {
    quote: "The insights we've gained have been invaluable. Issues that were hidden for months surfaced within days.",
    author: "Aisha Patel",
    position: "HR Director at GrowthStar",
    image: "/images/testimonial-3.jpg"
  },
  {
    quote: "Our product roadmap is now driven by actual user feedback rather than assumptions. Game changer!",
    author: "Carlos Rodriguez",
    position: "CEO at LaunchPad",
    image: "/images/testimonial-4.jpg"
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Users</span> Say
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Thousands of teams and individuals use MutedBox to collect honest, anonymous feedback.
          </p>
        </motion.div>
        
        {/* Testimonials carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-8 md:p-12 mb-8 relative">
            {/* Quote icon */}
            <div className="absolute top-6 left-6 text-primary/20">
              <Quote size={40} />
            </div>
            
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-8"
            >
              <blockquote className="text-xl md:text-2xl mb-6 text-center">
                "{testimonials[activeIndex].quote}"
              </blockquote>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-background-light/80 mb-4"></div>
                <div className="text-center">
                  <p className="font-semibold">{testimonials[activeIndex].author}</p>
                  <p className="text-text-muted text-sm">{testimonials[activeIndex].position}</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-center space-x-4">
            <Button 
              variant="glass" 
              size="icon" 
              onClick={handlePrev}
              className="h-12 w-12 rounded-full"
            >
              <ChevronLeft />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-primary' : 'bg-white/20'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <Button 
              variant="glass" 
              size="icon" 
              onClick={handleNext}
              className="h-12 w-12 rounded-full"
            >
              <ChevronRight />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
