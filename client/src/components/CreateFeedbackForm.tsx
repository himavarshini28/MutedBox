'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function CreateFeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isCreated,setIsCreated] =useState(false);
  const [feedbackUrl,setFeedbackUrl] =useState('');
  

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.trim()) {
      setError('Please enter a feedback prompt');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (isAuthenticated && user?.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/feedback/create`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ feedback }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setFeedbackUrl(data.uniqueId); // e.g., 'https://your-app.com/feedback/123'
      setIsCreated(true);
    } catch (err: any) {
      setError(err.message || 'Failed to create feedback link');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!feedbackUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Feedback Request',
          text: 'Please give your anonymous feedback!',
          url: feedbackUrl,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(feedbackUrl);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Clipboard copy failed:', err);
        alert('Could not copy the link.');
      }
    }
     setFeedback('');
  setFeedbackUrl('');
  setIsCreated(false);
  };
  return (
    <div className="max-w-2xl mx-auto bg-background-light/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-primary/10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 mb-3">
          <span className="animate-pulse mr-2">•</span> Create & Share
        </div>
        <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Create Feedback Link</h2>
        
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <label htmlFor="feedback" className="block text-sm font-medium text-text-muted">
            What would you like feedback on?
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="E.g., Please provide anonymous feedback on our recent team meeting"
            className="w-full px-5 py-3 bg-background/60 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
            rows={4}
            disabled={isLoading}
          />
          <p className="text-xs text-text-muted italic">This prompt will be shown to people you share your feedback link with</p>
        </div>
        
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
        
        <button
          type={!isCreated? 'submit':'button'}
          onClick={isCreated ? handleShare : handleSubmit}
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg hover:opacity-95 transition-all duration-200 transform hover:-translate-y-0.5 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >{isCreated ? 'share':(
          isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
          ) : 'Create Feedback Link')}
        </button>
        
        
      </form>
    </div>
  );
}
