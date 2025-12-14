import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Search 
        </h1>
        {query && (
          <p className="text-gray-600 dark:text-gray-400">
            Searching for: <span className="font-semibold">"{query}"</span>
          </p>
        )}
      </div>

      {/* Placeholder - sẽ hiển thị kết quả sau */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {query ? 'Loading search results...' : 'Enter a search query to find movies'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Search;
