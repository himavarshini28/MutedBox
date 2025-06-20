'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  MessageSquare, 
  Copy, 
  Trash2, 
  Send, 
  MoreHorizontal,
  Heart,
  Clock,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Mock data - in a real app, this would come from the API
const mockFeedback = {
  id: '1',
  name: 'Team Feedback Q2 2025',
  uniqueId: 'team-q2-2025',
  createdAt: '2025-05-15T10:30:00Z',
  responseCount: 8,
  active: true
};

const mockResponses = [
  {
    id: '1',
    feedback: 'The new project management dashboard is fantastic. It has made tracking deadlines so much easier. I especially love the calendar integration feature.',
    createdAt: '2025-06-18T13:45:00Z',
    replied: true,
    reply: 'Thank you for the positive feedback! We\'re glad you\'re enjoying the calendar integration feature.',
  },
  {
    id: '2',
    feedback: 'Team communication could be improved. Sometimes information gets lost between departments. Perhaps we could have weekly sync meetings?',
    createdAt: '2025-06-17T09:20:00Z',
    replied: false,
  },
  {
    id: '3',
    feedback: 'I think our client onboarding process needs some refinement. There are too many steps and clients get confused about what they need to provide.',
    createdAt: '2025-06-16T16:35:00Z',
    replied: true,
    reply: 'This is great feedback. We\'re currently reviewing our onboarding process and will streamline it in the next quarter.',
  },
  {
    id: '4',
    feedback: 'The company culture is amazing! I feel valued and appreciated every day.',
    createdAt: '2025-06-15T11:50:00Z',
    replied: false,
  },
];

export default function FeedbackResponses() {
  const { uniqueId } = useParams();
  const router = useRouter();
  const [responses, setResponses] = useState(mockResponses);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isReplying, setIsReplying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    responded: false,
    notResponded: false,
  });

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleReply = (responseId: string) => {
    if (replyingTo === responseId) {
      setReplyingTo(null);
    } else {
      setReplyingTo(responseId);
    }
  };

  const handleSubmitReply = async (responseId: string) => {
    if (!replyText[responseId]?.trim()) return;
    
    setIsReplying(true);
    
    try {
      // In a real app, this would call the API to submit the reply
      // await fetch(`/api/feedback/${uniqueId}/responses/${responseId}/reply`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ reply: replyText[responseId] }),
      // });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setResponses(prevResponses => 
        prevResponses.map(response => 
          response.id === responseId 
            ? { ...response, replied: true, reply: replyText[responseId] } 
            : response
        )
      );
      
      setReplyingTo(null);
      setReplyText(prev => ({ ...prev, [responseId]: '' }));
    } catch (err) {
      console.error('Error submitting reply:', err);
    } finally {
      setIsReplying(false);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = (responseId: string) => {
    // In a real app, this would call the API to delete the response
    setResponses(responses.filter(response => response.id !== responseId));
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter responses based on filter options
  const filteredResponses = responses.filter(response => {
    if (!filterOptions.responded && !filterOptions.notResponded) return true;
    if (filterOptions.responded && response.replied) return true;
    if (filterOptions.notResponded && !response.replied) return true;
    return false;
  });

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            className="mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Button>

          <Card className="glass-card mb-8">
            <CardHeader>
              <div className="flex flex-wrap justify-between gap-4">
                <div>
                  <CardTitle>{mockFeedback.name}</CardTitle>
                  <CardDescription>
                    Created on {formatDate(mockFeedback.createdAt)}
                  </CardDescription>
                </div>

                <div className="flex items-center gap-2 self-start">
                  <div className={`w-2 h-2 rounded-full mr-1 ${mockFeedback.active ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  <span className="text-sm mr-2">{mockFeedback.active ? 'Active' : 'Inactive'}</span>
                  
                  <CopyToClipboard 
                    text={`https://mutedbox.com/f/${uniqueId}`}
                    onCopy={handleCopy}
                  >
                    <Button variant="glass" size="sm">
                      {copied ? 'Copied!' : 'Copy Link'}
                      <Copy size={14} className="ml-2" />
                    </Button>
                  </CopyToClipboard>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-background-light/30 p-4 rounded-lg border border-white/5">
                  <p className="text-text-muted text-sm mb-1">Total Responses</p>
                  <div className="flex items-center">
                    <MessageSquare size={18} className="mr-2 text-primary" />
                    <p className="text-2xl font-bold">{responses.length}</p>
                  </div>
                </div>
                <div className="bg-background-light/30 p-4 rounded-lg border border-white/5">
                  <p className="text-text-muted text-sm mb-1">Replied</p>
                  <div className="flex items-center">
                    <CheckCircle2 size={18} className="mr-2 text-green-400" />
                    <p className="text-2xl font-bold">{responses.filter(r => r.replied).length}</p>
                  </div>
                </div>
                <div className="bg-background-light/30 p-4 rounded-lg border border-white/5">
                  <p className="text-text-muted text-sm mb-1">Last Response</p>
                  <div className="flex items-center">
                    <Clock size={18} className="mr-2 text-primary" />
                    <p className="text-sm">{responses.length > 0 ? formatDate(responses[0].createdAt) : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Feedback Responses</h2>
            
            <div className="flex gap-2">
              <Button
                variant={filterOptions.responded ? "secondary" : "glass"}
                size="sm"
                onClick={() => setFilterOptions(prev => ({
                  ...prev,
                  responded: !prev.responded
                }))}
              >
                <CheckCircle2 size={14} className="mr-1" />
                Replied
              </Button>
              
              <Button
                variant={filterOptions.notResponded ? "secondary" : "glass"}
                size="sm"
                onClick={() => setFilterOptions(prev => ({
                  ...prev,
                  notResponded: !prev.notResponded
                }))}
              >
                <MessageSquare size={14} className="mr-1" />
                Not Replied
              </Button>
            </div>
          </div>

          {filteredResponses.length === 0 ? (
            <div className="text-center py-12 glass-card">
              <MessageSquare size={32} className="mx-auto mb-4 text-text-muted" />
              <p className="text-xl font-semibold mb-2">No Responses Yet</p>
              <p className="text-text-muted">
                When people submit feedback, they'll appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredResponses.map((response, index) => (
                <motion.div
                  key={response.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="glass-card bg-background-light/20">
                    <CardHeader className="border-b border-white/5 pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-background-light/90 flex items-center justify-center mr-3">
                            <MessageSquare size={16} />
                          </div>
                          <div>
                            <p className="text-sm text-text-muted">Anonymous Feedback</p>
                            <p className="text-xs text-text-muted">{formatDate(response.createdAt)}</p>
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-text-muted/60 hover:text-text hover:bg-background-light/50"
                          onClick={() => handleDelete(response.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="py-4">
                      <p className="mb-4">{response.feedback}</p>
                      
                      <div className="flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-text-muted hover:text-primary"
                          onClick={() => handleReply(response.id)}
                        >
                          <Heart size={16} className="mr-2" />
                          Like
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-text-muted hover:text-primary"
                          onClick={() => handleReply(response.id)}
                        >
                          {response.replied ? 'Edit Reply' : 'Reply'}
                          <MessageSquare size={16} className="ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                    
                    {(response.replied || replyingTo === response.id) && (
                      <div className="pt-0 px-6 pb-6">
                        <div className="border-t border-white/5 pt-4">
                          {replyingTo === response.id ? (
                            <div className="space-y-4">
                              <Textarea 
                                placeholder="Write your reply..."
                                value={replyText[response.id] || ''}
                                onChange={(e) => setReplyText(prev => ({
                                  ...prev,
                                  [response.id]: e.target.value
                                }))}
                              />
                              
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setReplyingTo(null)}
                                >
                                  Cancel
                                </Button>
                                
                                <Button
                                  variant="gradient"
                                  size="sm"
                                  onClick={() => handleSubmitReply(response.id)}
                                  disabled={isReplying}
                                >
                                  {isReplying ? (
                                    <>
                                      <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2" />
                                      Sending...
                                    </>
                                  ) : (
                                    <>
                                      Send Reply
                                      <Send size={14} className="ml-2" />
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          ) : response.replied && (
                            <div className="pl-4 border-l-2 border-primary/30">
                              <div className="flex items-center mb-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mr-2">
                                  <span className="text-white text-xs">Y</span>
                                </div>
                                <span className="text-sm font-medium">Your Reply</span>
                              </div>
                              <p className="text-text-muted">{response.reply}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
