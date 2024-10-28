import { useParams, Link } from 'react-router-dom'; 
import { useQuery } from '@tanstack/react-query'; 
import axios from 'axios'; 

// Define the Photo type
interface Photo {
  id: string; 
  urls: { full: string }; 
  user: { name: string; profile_image: { small: string } }; 
  alt_description?: string; 
  description?: string; 
}

// Fetch function to get photo data by ID
const fetchPhoto = async (id: string) => {
  const response = await axios.get<Photo>(`https://api.unsplash.com/photos/${id}`, {
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`, // Use your Unsplash API key
    },
  });
  return response.data; 
};

export default function PhotoDetails() {
  const { id } = useParams<{ id: string }>(); 

  const { data: photo, isLoading, isError, error } = useQuery<Photo, Error>({
    queryKey: ['photo', id], 
    queryFn: () => fetchPhoto(id!), 
  });

  // Loading state
  if (isLoading) return <p className="text-center text-gray-400">Loading...</p>;
  // Error state
  if (isError) return <p className="text-center text-red-500">{(error as Error).message}</p>;

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen">
      {photo && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full transform transition duration-500 hover:scale-100">
          <img
            className="object-cover rounded-t-lg transition-transform duration-300 hover:scale-105" // Image styling with hover effect
            src={photo.urls.full} 
            alt={photo.alt_description || 'Photo'} 
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {photo.alt_description || 'Untitled'}
            </h2>
            <p className="text-gray-500 text-sm mb-4 flex items-center justify-center">
              <img
                src={photo.user.profile_image.small} 
                alt={photo.user.name} 
                className="h-8 w-8 rounded-full mr-2" // Avatar styling
              />
              <span className="font-medium">By {photo.user.name}</span> 
            </p>
            <div className="flex justify-center items-center p-6">
              <p className="text-gray-700 text-base leading-relaxed mb-5 text-justify">
                {photo.description || photo.alt_description || 'No description available.'}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <Link
                to="/" // Link back to the gallery
                className="text-indigo-500 hover:text-indigo-600 text-sm font-medium transition duration-200"
              >
                ← Back to Gallery
              </Link>
              <button
                className="px-5 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition duration-300" // Button to view full image
                onClick={() => window.open(photo.urls.full, '_blank')}
              >
                View Full Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};