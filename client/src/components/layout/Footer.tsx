"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-white/10 bg-background/80 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center">
              <div className="bg-gradient-to-r from-primary to-secondary rounded-lg h-8 w-8 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-text font-bold text-lg">MutedBox</span>
            </Link>
              <p className="mt-4 text-text-muted text-sm">
              Anonymous feedback platform for teams and individuals. 
              Collect honest insights without revealing identities.
            </p>
            
            <div className="mt-6 flex space-x-4">
              <motion.a
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </motion.a>
              <motion.a
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </motion.a>
            </div>
          </div>
          
          <div>
            <h4 className="text-text font-medium mb-3">Product</h4>            <ul className="space-y-2">
              <li><Link href="/features" className="text-text-muted text-sm hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-text-muted text-sm hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/faq" className="text-text-muted text-sm hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-text font-medium mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-text-muted text-sm hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/docs" className="text-text-muted text-sm hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="/api" className="text-text-muted text-sm hover:text-primary transition-colors">API</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-text font-medium mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-text-muted text-sm hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/careers" className="text-text-muted text-sm hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/privacy" className="text-text-muted text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-text-muted text-sm hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-muted text-sm">
            © {currentYear} MutedBox. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy" className="text-text-muted text-xs hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-text-muted text-xs hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-text-muted text-xs hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
