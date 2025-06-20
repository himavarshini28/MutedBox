"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, MessageSquare, Link, Eye, ThumbsUp, AlertTriangle } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const features = [
  {
    title: 'Complete Anonymity',
    description: 'Feedback providers remain 100% anonymous. Their identity is never stored or tracked.',
    icon: <Shield className="text-primary" size={28} />,
  },
  {
    title: 'Unique Feedback Links',
    description: 'Generate custom links for each feedback request or project to organize responses.',
    icon: <Link className="text-primary" size={28} />,
  },
  {
    title: 'Honest Responses',
    description: 'Anonymity leads to more honest, constructive feedback from peers and customers.',
    icon: <MessageSquare className="text-primary" size={28} />,
  },
  {
    title: 'Private Dashboard',
    description: 'View all your feedback in one organized place with powerful filtering options.',
    icon: <Eye className="text-primary" size={28} />,
  },
  {
    title: 'Response Options',
    description: 'Choose to publicly acknowledge feedback while maintaining anonymity.',
    icon: <ThumbsUp className="text-primary" size={28} />,
  },
  {
    title: 'Content Moderation',
    description: 'Optional AI-powered moderation to filter inappropriate content.',
    icon: <AlertTriangle className="text-primary" size={28} />,
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px 0px" });
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-10 -right-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Premium <span className="gradient-text">Features</span> for Better Feedback
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-text-muted text-lg"
          >
            MutedBox gives you powerful tools to collect, manage, and respond to anonymous feedback.
          </motion.p>
        </div>
        
        {/* Features grid */}          <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full glass-card card-hover bg-background-light/20 border border-white/5 overflow-hidden relative">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                <CardHeader>
                  <div className="mb-3 p-3 w-fit rounded-xl bg-background-light/60">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-text-muted text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
