"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useBlogData } from "../hooks/useBlogData";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const blogData = useBlogData();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const searchInputRef = useRef(null);

  // Dynamic navigation functions
  const getCurrentSection = () => {
    if (pathname.startsWith("/blog")) return "writings";
    if (pathname.startsWith("/projects")) return "projects";
    return null;
  };

  const getCurrentSectionHref = () => {
    if (pathname.startsWith("/blog")) return "/blog";
    if (pathname.startsWith("/projects")) return "/projects";
    return "/";
  };

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      // Add background blur when scrolled
      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const baseLinkClass = "text-nav tracking-nav transition-all duration-200 font-mono relative group";

  const NavLink = ({ href, children, onClick }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`${baseLinkClass} ${
          isActive ? "text-white" : "text-white/60"
        } hover:text-white`}
      >
        <span className="relative">
          {children}
          <span className={`absolute -bottom-1 left-0 h-px bg-nav transform transition-transform duration-200 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
        </span>
      </Link>
    );
  };

  // Search functionality
  const searchItems = [
    ...blogData.filteredBlogs.map(post => ({
      ...post,
      type: "blog",
      href: `/blog/${post.slug}`
    })),
    // Add projects when available
  ];

  const filteredResults = searchItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 5);

  const handleSearchSelect = (item) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(item.href);
  };

  const currentSection = getCurrentSection();

  return (
    <>
      {/* Progress indicator for blog posts */}
      {pathname.startsWith("/blog/") && (
        <div className="fixed top-0 left-0 right-0 h-px bg-white/10 z-50">
          <div 
            className="h-full bg-nav transition-transform duration-150"
            style={{
              transform: `translateX(${Math.max(0, (1 - window.scrollY / (document.documentElement.scrollHeight - window.innerHeight))) * 100 - 100}%)`
            }}
          />
        </div>
      )}

      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="max-w-[40rem] mx-auto px-6 md:px-4">
          <div className="flex justify-between items-center h-16 md:h-14">
            {/* Dynamic Navigation Links */}
            <div className="flex items-center gap-2 text-nav font-medium text-white/70 select-none">
              <span className="text-white/50">/</span>
              <NavLink href="/">home</NavLink>
              {currentSection && (
                <>
                  <span className="text-white/50">/</span>
                  <NavLink href={getCurrentSectionHref()}>{currentSection}</NavLink>
                </>
              )}
            </div>

            {/* Search button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-white/60 hover:text-white transition-colors duration-200"
              aria-label="Search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />
          
          {/* Search panel */}
          <div className="absolute left-0 right-0 top-20 max-w-[40rem] mx-auto px-6 md:px-4">
            <div className="bg-black/90 backdrop-blur-md border border-white/10 rounded-lg">
              <div className="p-4">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search posts..."
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded text-white placeholder-white/40 focus:outline-none focus:border-nav/50 transition-colors duration-200 font-mono text-nav"
                  />
                </div>
                
                {/* Search results */}
                {searchQuery && (
                  <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                    {filteredResults.length > 0 ? (
                      filteredResults.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchSelect(item)}
                          className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded transition-colors duration-200 group"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-mono text-sm truncate group-hover:text-nav transition-colors duration-200">
                                {item.title}
                              </h4>
                              {item.description && (
                                <p className="text-white/40 text-xs mt-1 line-clamp-2">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            <span className="text-xs text-white/30 font-mono uppercase">
                              {item.type}
                            </span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="text-white/40 text-center py-4 text-sm">
                        No results found for "{searchQuery}"
                      </p>
                    )}
                  </div>
                )}
                
                {/* Keyboard shortcut hint */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-white/30 text-xs text-center">
                    Press <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">ESC</kbd> to close
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;