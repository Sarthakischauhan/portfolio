import { ChevronDown } from 'lucide-react';

const BlogFilter = ({ selectedTag, setSelectedTag, allTags }) => {
  return (
    <div className="relative">
      <div className="relative">
        <select 
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="cursor-pointer text-opacity-70 text-white appearance-none w-[120px] h-9 px-3 pr-8 text-sm rounded-full border border-white/50 bg-transparent focus:outline-none hover:border-white transition-colors duration-300 hover:text-opacity-100"
        >
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown className='h-4 w-4 opacity-50' />
        </div>
      </div>
    </div>
  );
};

export default BlogFilter;