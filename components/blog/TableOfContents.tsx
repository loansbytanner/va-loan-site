'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function extractHeadings(content: string): TOCItem[] {
  const lines = content.split('\n');
  const headings: TOCItem[] = [];

  lines.forEach((line) => {
    if (line.startsWith('## ')) {
      const text = line.slice(3).trim();
      headings.push({
        id: text.toLowerCase().replace(/\s+/g, '-'),
        text,
        level: 2,
      });
    } else if (line.startsWith('### ')) {
      const text = line.slice(4).trim();
      headings.push({
        id: text.toLowerCase().replace(/\s+/g, '-'),
        text,
        level: 3,
      });
    }
  });

  return headings;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);
  const headings = extractHeadings(content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      // Update URL without scrolling
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav
      className="sticky top-24 bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
      aria-label="Table of Contents"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          <List className="h-5 w-5 text-gold-primary" aria-hidden="true" />
          <span className="font-semibold text-navy-deep">In This Article</span>
        </div>
        <svg
          className={`h-5 w-5 text-slate-dark transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Links */}
      {isExpanded && (
        <ul className="mt-4 space-y-1">
          {headings.map(({ id, text, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={`
                  block py-1.5 text-sm transition-colors border-l-2
                  ${level === 2 ? 'pl-4' : 'pl-8'}
                  ${activeId === id
                    ? 'text-gold-primary border-gold-primary font-medium'
                    : 'text-slate-dark hover:text-navy-deep border-transparent hover:border-gray-300'
                  }
                `}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
