'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function FeedbackForm() {
  const { uniqueId } = useParams();
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (feedback.trim().length < 10) {
      setError('Please provide more detailed feedback (at least 10 characters)');
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call the API to submit the feedback
      // await fetch(`/api/feedback/${uniqueId}/respond`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ feedback }),
      // });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      setFeedback('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error submitting feedback:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-white/5">
        <div className="container mx-auto max-w-2xl flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-lg h-8 w-8 flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-lg">MutedBox</span>
          </Link>
        </div>
      </header>
      
      <div className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl"
        >
          {isSubmitted ? (
            <div className="glass-card p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="text-green-400" size={32} />
              </motion.div>
              
              <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
              <p className="text-text-muted mb-6">
                Your feedback has been submitted anonymously. Your insights are valuable!
              </p>
              
              <Button variant="glass" onClick={() => setIsSubmitted(false)}>
                Submit Another Response
              </Button>
            </div>
          ) : (
            <div className="glass-card p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">Anonymous Feedback</h1>
                <p className="text-text-muted">
                  Your response will be completely anonymous. Share your honest thoughts.
                </p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your thoughts or feedback anonymously..."
                    className="min-h-[200px]"
                  />
                  
                  {error && (
                    <div className="mt-2 flex items-center text-red-400 text-sm">
                      <AlertCircle size={16} className="mr-2" />
                      {error}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    variant="gradient" 
                    className="glow" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Feedback
                        <Send size={16} className="ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
              
              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-text-muted text-sm">
                  Powered by <Link href="/" className="text-primary">MutedBox</Link>
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
