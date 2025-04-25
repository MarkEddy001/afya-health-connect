
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBoxProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ 
  onSearch, 
  placeholder = 'Search...', 
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className={`flex w-full gap-2 ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit" variant="default" className="bg-health-primary hover:bg-health-secondary">
        Search
      </Button>
    </form>
  );
};

export default SearchBox;
