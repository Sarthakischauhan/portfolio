import { useState } from 'react';
import data from '../../public/data.json';

export const useBlogData = () => {
  const BLOG_DATA = [...data.blogData].sort((a, b) => 
    new Date(b.date_posted) - new Date(a.date_posted)
  );
  
  const allTags = ['All', ...new Set(BLOG_DATA.flatMap(blog => blog.tags || []))];
  
  const [selectedTag, setSelectedTag] = useState('All');

  const filteredBlogs = selectedTag === 'All' 
    ? BLOG_DATA 
    : BLOG_DATA.filter(blog => blog.tags?.includes(selectedTag));

  return {
    blogs: filteredBlogs,
    allTags,
    selectedTag,
    setSelectedTag,
  };
};