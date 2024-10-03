import Link from 'next/link'
import { Github, Linkedin, Dribbble, Instagram, File} from 'lucide-react';
import React from "react";

const SocialTiles = () => {
  return (
    <div className="w-full py-2 mt-2 select-none">
      <div className="container mx-auto flex justify-start items-center space-x-4">
        <Link href="https://github.com/Sarthakischauhan" className="text-gray-400 hover:text-white transition-colors">
          <Github size={18} />
          <span className="sr-only">GitHub</span>
        </Link>
        <Link href="/Resume.pdf" className="text-gray-400 hover:text-white transition-colors">
          <File size={18} /> 
          <span className="sr-only">Resume</span>
        </Link>
        <Link href="https://www.linkedin.com/in/sarthakchauhan01/" className="text-gray-400 hover:text-white transition-colors">
          <Linkedin size={18} />
          <span className="sr-only">LinkedIn</span>
        </Link>
        <Link href="https://www.instagram.com/sarthhkkkk/" className="text-gray-400 hover:text-white transition-colors">
          <Instagram size={18} />
          <span className="sr-only">Instagram</span>
        </Link>
        <Link href="https://dribbble.com/Sarthakischauhan" className="text-gray-400 hover:text-white transition-colors">
          <Dribbble size={18} />
          <span className="sr-only">Goodreads</span>
        </Link>
      </div>
    </div>
  )
}


export default SocialTiles;