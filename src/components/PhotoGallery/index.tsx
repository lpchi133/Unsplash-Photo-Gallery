import { useInfiniteQuery } from "@tanstack/react-query"; 
import InfiniteScroll from "react-infinite-scroll-component"; 
import { Link } from "react-router-dom"; 
import Masonry from "react-masonry-css"; 
import axios from "axios"; 

interface Photo {
  id: string; 
  urls: { thumb: string }; 
  user: { name: string; profile_image: { small: string } }; 
  alt_description?: string; 
}

const breakpointColumnsObj = {
  default: 4, 
  1100: 3, 
  700: 2, 
  500: 1, 
};

export default function PhotoGallery() {
  // Function to fetch photos from Unsplash API
  const fetchPhotos = async ({ pageParam = 1 }) => {
    const response = await axios.get("https://api.unsplash.com/photos", {
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`, // Set the authorization header
      },
      params: {
        per_page: 10, // Number of photos per page
        page: pageParam, // Current page number for pagination
      },
    });
    return response.data; 
  };

  // Infinite query to manage fetching photo data
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["photos"], 
    queryFn: fetchPhotos,
    initialPageParam: 1,  
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined; // Determine if there's another page to fetch
    },
  });

  // Handle loading state
  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  // Handle error state
  if (isError) return <p className="text-center text-red-500">{(error as Error).message}</p>;

  return (
    <div className="p-2">
      <InfiniteScroll
        dataLength={data?.pages.flat().length || 0} // Total number of loaded items
        next={fetchNextPage} // Function to load more items
        hasMore={hasNextPage || false} // Check if more items are available
        loader={<p className="text-center text-gray-500">Loading more photos...</p>} 
        endMessage={<p className="text-center text-gray-500">No more photos to load.</p>} 
      >
        <Masonry
          breakpointCols={breakpointColumnsObj} // Responsive column configuration for the layout
          className="flex w-auto gap-x-4 gap-y-4"
          columnClassName="masonry-grid-column"
        >
          {data?.pages.flat().map((photo: Photo) => ( 
            <Link to={`/photos/${photo.id}`} key={photo.id}> 
              <div className="relative rounded-lg shadow-lg overflow-hidden mb-4 transition-transform duration-300">
                <img
                  className="h-auto w-full rounded-lg" 
                  src={photo.urls.thumb} 
                  alt={photo.alt_description || "Photo"} 
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white bg-black bg-opacity-40 flex items-center justify-center">
                  <img
                    src={photo.user.profile_image.small} 
                    alt={photo.user.name} 
                    className="h-8 w-8 rounded-full mr-2" 
                  />
                  <p className="text-sm font-medium">{photo.user.name}</p> 
                </div>
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-100 hover:bg-opacity-40 transition-opacity duration-300"></div> 
              </div>
            </Link>
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
}
