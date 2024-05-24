import { useEffect, useState } from "react";
import { getAllPostFunction } from "@/utils/api/methods/PostService/get";
import { UserData } from "@/utils/interfaces/interface";
import { useSelector } from "react-redux";

import PostCard from "@/components/shared/PostCard";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SuggestedUsers from "@/components/shared/SuggestedUsers";


const Home = () => {
  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
;

  const id = userData.finduser._id;
  

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      navigate("/");
    } else {
      navigate("/log-in");
    }
  }, []);

  const [isPostLoading, setIsPostLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPostFunction();

        if (response && response.data && response.data.data) {
          setPosts(response.data.data);
        }
      } catch (error) {
        console.error("Error while Fetching posts", error);
        setIsPostLoading(false);
      }
    };
    fetchPosts();

    const intervalId = setInterval(fetchPosts, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className=" flex flex-1">
      <div className="home-container">
        
        <div className="home-post">
          
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col gap-9 w-full">
              {posts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div >
      <div className="hidden md:block w-1/3 justify-end ml-36">
        <SuggestedUsers />
        </div>
    </div>
  );
};

export default Home;
