import Link from 'next/link'
import { Github, Linkedin, Dropbox, Instagram, Twitter, BookOpen } from 'lucide-react';
import React from "react";

const SocialTiles = () => {
  return (
    <div className="w-full py-2 mt-2 select-none">
      <div className="container mx-auto flex justify-start items-center space-x-4">
        <Link href="https://github.com" className="text-gray-400 hover:text-white transition-colors">
          <Github size={18} />
          <span className="sr-only">GitHub</span>
        </Link>
        <Link href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
          <Linkedin size={18} />
          <span className="sr-only">LinkedIn</span>
        </Link>
        <Link href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
          <Instagram size={18} />
          <span className="sr-only">Instagram</span>
        </Link>
        <Link href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
          <Twitter size={18} />
          <span className="sr-only">Twitter</span>
        </Link>
        <Link href="https://goodreads.com" className="text-gray-400 hover:text-white transition-colors">
          <BookOpen size={18} />
          <span className="sr-only">Goodreads</span>
        </Link>
      </div>
    </div>
  )
}


export default SocialTiles;