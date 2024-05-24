import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";
import { PostData } from "@/utils/interfaces/interface";
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';


const ExplorePage = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [q, setQ] = useState<string>("");
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/all-post`);
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchData = useCallback(debounce(async (query: string) => {
    if (query.trim() === '') {
        setPosts([]);
      
        setSearchPerformed(false); // No search is performed when the query is empty
        return;
    }

    try {
       
        const postsResponse = await axios.get(`http://localhost:3000/api/search-post/${query}`);
          

        console.log("the post response",postsResponse)
   
        setPosts(postsResponse.data.posts);
       
        setSearchPerformed(true); // Search has been performed
    } catch (error) {
        console.error("Error fetching data", error);
        setSearchPerformed(true); // Search has been performed, even if there was an error
    }
}, 500), []);
  useEffect(() => {
    const debouncedFetchPosts = debounce(fetchPosts, 300);

    if (q.trim() !== "") {
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

  const handleButtonClick = () => {
   fetchData(q)
  };
  console.log("postsssssss", posts);

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="flex w-full max-w-sm space-x-2 mb-10">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="text"
          placeholder="Search posts"
        />
        <Button onClick={handleButtonClick} type="submit">
          Search
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {posts.length > 0
          ? posts.map((post) => (
            <LazyLoadImage
            key={post._id}
            src={`http://localhost:3000/profile/${post.image[0]}`}
            alt="Profile"
            className="w-64 h-64 object-cover rounded-lg"
            loading="lazy"
          />
            ))
          : "No Post found"}{" "}
      </div>
    </div>
  );
};
export default ExplorePage;
