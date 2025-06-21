"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Link2, Send, MessageCircle, LineChart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const steps = [
    {
      title: "Create a Unique Link",
      description:
        "Generate a custom feedback link in seconds. No account required to get started.",
      icon: <Link2 className="h-8 w-8 text-primary" />,
      delay: 0.1,
    },
    {
      title: "Share With Anyone",
      description:
        "Send your link to colleagues, customers, or friends to gather their honest thoughts.",
      icon: <Send className="h-8 w-8 text-primary" />,
      delay: 0.2,
    },
    {
      title: "Collect Feedback",
      description:
        "Receive anonymous responses in your dashboard. No way to trace who said what.",
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
      delay: 0.3,
    },
    {
      title: "Analyze & Improve",
      description:
        "Review feedback patterns, respond if needed, and make data-driven decisions.",
      icon: <LineChart className="h-8 w-8 text-primary" />,
      delay: 0.4,
    },
  ];
  const router=useRouter();
  const handleCreateLink=()=>{
    router.push('/create-feedback');
  }

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">MutedBox</span> Works
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Collecting honest feedback has never been easier. Four simple steps to get valuable insights.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: step.delay }}
              className="relative"
            >
              {/* Step number */}
              <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-background-light/60 border border-white/10 flex items-center justify-center text-xl font-semibold text-white z-10">
                {index + 1}
              </div>
              
              {/* Content */}
              <div className="glass-card card-hover p-6 pt-10 h-full">
                <div className="mb-4 p-3 rounded-lg bg-background-light/50 inline-flex">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-text-muted">{step.description}</p>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t border-dashed border-white/20" />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Button  onClick={handleCreateLink} size="lg" variant="gradient" className="glow group">
            Create Your Feedback Link
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
