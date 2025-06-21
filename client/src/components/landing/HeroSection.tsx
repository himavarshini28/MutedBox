"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Lock, Users, Key } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const router = useRouter();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const handleCreateLink=()=>{
    router.push('/create-feedback');
  }

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 md:pt-28"
    >
      {/* Background gradient blur effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-secondary/30 rounded-full filter blur-3xl opacity-30 animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-secondary/30 rounded-full filter blur-3xl opacity-30" />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 z-10 relative"
      >
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
              <span className="animate-pulse mr-2">•</span> Collect honest feedback,
              anonymously
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="gradient-text">Hear What People</span>
            <br />
            <span>Really Think</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto mb-10"
          >
            Create a unique link, share it, and collect honest feedback
            without revealing who said what.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >            <Button size="xl" variant="gradient" className="glow group" onClick={handleCreateLink}>
              Create Feedback Link
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="xl" variant="glass">
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto"
          >
            {[
              { label: "Anonymous Responses", value: "250K+" },
              { label: "Feedback Links", value: "50K+" },
              { label: "Happy Users", value: "12K+" },
              { label: "Response Rate", value: "94%" },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-6 card-hover">
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}