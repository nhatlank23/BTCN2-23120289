import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPersonDetail } from '../../services/movieService';

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonDetail = async () => {
      try {
        setLoading(true);
        const data = await getPersonDetail(id);
        setPerson(data);
      } catch (error) {
        console.error('Error fetching person detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-xl text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-xl text-gray-600 dark:text-gray-400">Person not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {person.name}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">Person details coming soon...</p>
    </div>
  );
};

export default PersonDetail;