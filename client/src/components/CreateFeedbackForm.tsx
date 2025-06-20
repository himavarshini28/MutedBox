'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateFeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      setError('Please enter a feedback prompt');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/feedback/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      // Redirect to the feedback page
      router.push(`/feedback/${data.uniqueId}`);
      
    } catch (err: any) {
      setError(err.message || 'Failed to create feedback link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-background-light p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Create Feedback Link</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="feedback" className="block text-text-muted mb-2">
            Feedback Prompt
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="E.g., Please provide anonymous feedback on our recent team meeting"
            className="w-full px-4 py-2 bg-background border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
            disabled={isLoading}
          />
        </div>
        
        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-md font-medium hover:opacity-90 transition-opacity ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Creating...' : 'Create Feedback Link'}
        </button>
      </form>
    </div>
  );
}
