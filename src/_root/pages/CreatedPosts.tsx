import { useSelector } from "react-redux";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { debounce } from "@/lib/utils";

import { PostData, UserData } from "@/utils/interfaces/interface";
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';


const CreatedPost = () => {
  const userData = useSelector((state: UserData) => state.persisted.user.userData);
// Corrected variable name
  const { id: routeId } = useParams(); // Assuming the route is something like /profile/:id/liked-posts
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<PostData[]>([]);
  const [q, setQ] = useState<string>('');

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/getCreatedPost/${routeId}`); // Use routeId for consistency
      console.log("createdPost data", response.data);
      setPosts(response?.data?.data);
    } catch (error) {
      console.log("error in getting createdPost", error);
    }
  };

  useEffect(() => {
    const debouncedFetchPosts = debounce(fetchPosts, 300);

    if (q.trim()!== '') {
      debouncedFetchPosts();
    } else {
      fetchPosts();
    }

    return () => {
      debouncedFetchPosts.cancel();
    };
  }, [q]);

  useEffect(() => {
    fetchPosts();
  }, []);



  return (
    <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
     
     
      <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 py-4'>
        {posts.length > 0? posts.map((post) => (
          <Link to={`/post/${post._id}`}>
  <LazyLoadImage
  key={post._id}
  src={`http://localhost:3000/profile/${post.image[0]}`}
  alt="Profile"
  className="w-64 h-64 object-cover rounded-lg"
  loading="lazy"
/>    
</Link>    )) : 'No Post found'}
      </div>
    </div>
  );
};

export default CreatedPost;
