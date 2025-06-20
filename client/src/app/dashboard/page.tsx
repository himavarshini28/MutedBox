'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Link, Copy, Eye, Trash2, Filter, SlidersHorizontal } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Mock data - in a real app, this would come from the API
const mockFeedbackLinks = [
  {
    id: '1',
    name: 'Team Feedback Q2 2025',
    uniqueId: 'team-q2-2025',
    createdAt: '2025-05-15T10:30:00Z',
    responseCount: 8,
    active: true
  },
  {
    id: '2',
    name: 'Product Feature Survey',
    uniqueId: 'prod-survey-2025',
    createdAt: '2025-05-10T14:00:00Z',
    responseCount: 24,
    active: true
  },
  {
    id: '3',
    name: 'Department Leadership Review',
    uniqueId: 'leadership-review',
    createdAt: '2025-05-01T09:15:00Z',
    responseCount: 12,
    active: false
  }
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [feedbackLinks, setFeedbackLinks] = useState(mockFeedbackLinks);
  
  const handleCopy = (id: string) => {
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };
  
  const handleCreateNewLink = () => {
    // In a real app, this would call the API to create a new link
    console.log('Creating new link...');
  };
  
  const handleDeleteLink = (id: string) => {
    // In a real app, this would call the API to delete the link
    setFeedbackLinks(feedbackLinks.filter(link => link.id !== id));
  };
  
  // Filter links based on search query
  const filteredLinks = feedbackLinks.filter(link => 
    link.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="pt-28 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Feedback Dashboard</h1>
              <p className="text-text-muted">Manage your feedback links and view responses</p>
            </div>
            
            <Button 
              onClick={handleCreateNewLink} 
              variant="gradient" 
              className="glow mt-4 md:mt-0"
            >
              <Plus size={16} className="mr-2" />
              New Feedback Link
            </Button>
          </div>
          
          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>Summary of your feedback activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-background-light/30 p-4 rounded-lg border border-white/5">
                  <p className="text-text-muted text-sm">Active Links</p>
                  <p className="text-3xl font-bold">{feedbackLinks.filter(link => link.active).length}</p>
                </div>
                <div className="bg-background-light/30 p-4 rounded-lg border border-white/5">
                  <p className="text-text-muted text-sm">Total Responses</p>
                  <p className="text-3xl font-bold">{feedbackLinks.reduce((acc, link) => acc + link.responseCount, 0)}</p>
                </div>
                <div className="bg-background-light/30 p-4 rounded-lg border border-white/5">
                  <p className="text-text-muted text-sm">Last Response</p>
                  <p className="text-base font-medium">Today at 2:30 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <CardTitle>Your Feedback Links</CardTitle>
                  <CardDescription>Manage and monitor your feedback collection</CardDescription>
                </div>
                <div className="flex items-center mt-4 md:mt-0 gap-2">
                  <Input
                    placeholder="Search links..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button variant="glass" size="icon">
                    <Filter size={16} />
                  </Button>
                  <Button variant="glass" size="icon">
                    <SlidersHorizontal size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLinks.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-text-muted">No feedback links found</p>
                  </div>
                ) : (
                  filteredLinks.map((link) => (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-background-light/20 rounded-xl border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                      <div>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${link.active ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                          <h3 className="font-semibold">{link.name}</h3>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Link size={14} className="text-text-muted" />
                          <p className="text-sm text-text-muted">{`https://mutedbox.com/f/${link.uniqueId}`}</p>
                        </div>
                        <div className="md:hidden mt-2 flex items-center text-sm text-text-muted">
                          <span className="bg-background-light/60 px-2 py-0.5 rounded text-xs mr-2">
                            {link.responseCount} responses
                          </span>
                          <span>{formatDate(link.createdAt)}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
                        <div className="hidden md:flex items-center gap-3 text-sm text-text-muted">
                          <span className="bg-background-light/60 px-2 py-0.5 rounded text-xs">
                            {link.responseCount} responses
                          </span>
                          <span>{formatDate(link.createdAt)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 w-full md:w-auto">
                          <CopyToClipboard 
                            text={`https://mutedbox.com/f/${link.uniqueId}`}
                            onCopy={() => handleCopy(link.id)}
                          >
                            <Button variant="glass" size="sm" className="w-full md:w-auto">
                              {copied === link.id ? 'Copied!' : 'Copy Link'}
                              <Copy size={14} className="ml-2" />
                            </Button>
                          </CopyToClipboard>
                          
                          <Button variant="glass" size="sm" className="w-full md:w-auto">
                            View
                            <Eye size={14} className="ml-2" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() => handleDeleteLink(link.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
