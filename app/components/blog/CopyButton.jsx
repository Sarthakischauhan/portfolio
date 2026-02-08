'use client'
import React, { useState } from 'react'
import { ClipboardCheck, Copy } from 'lucide-react';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className="absolute right-2 top-2 px-2 flex flex-row gap-2 py-1 rounded-sm text-xs hover:backdrop-blur-md hover:bg-white/10 transition-colors"
    >
      {copied ?
          <>
            <ClipboardCheck className='h-4 w-4'/>
            <span className='none'>Copied!</span>
          </>
        :
          <>
          <Copy className='h-4 w-4'/>
          <span className='none'>Copy</span>
        </>
      }
    </button>
  );
};

export default CopyButton;