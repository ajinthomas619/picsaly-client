import { useEffect, useState } from "react";
import { getAllPostFunction, getPostorHome } from "@/utils/api/methods/PostService/get";
import { UserData } from "@/utils/interfaces/interface";
import { useSelector } from "react-redux";

import PostCard from "@/components/shared/PostCard";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SuggestedUsers from "@/components/shared/SuggestedUsers";
import InfiniteScroll from 'react-infinite-scroll-component'


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
  const [page,setPage] = useState(1)
  const [hasMore,setHasMore] = useState(true)
  
    const fetchPosts = async () => {
      try {
        const id = userData.finduser._id;
        const response = await getPostorHome(id,page);

        if (response && response.data && response.data.data) {
          setPosts(response.data.data.reverse());
          if(response.data.data.length === 0){
            setHasMore(false)
          }
        }
      } catch (error) {
        console.error("Error while Fetching posts", error);
      }
      finally{
        setIsPostLoading(false);

      }
    };

    useEffect(() => {
      fetchPosts()
    },[page])
    

  return (
    <div className=" flex flex-1 mt-8 ">
      <div className="home-container ">
        
        <div className="home-post">
          
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <InfiniteScroll
            dataLength={posts.length}
            next={() => setPage(prevPage => prevPage+1)}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={<p>No more data to load.</p> }
            >
            <ul className="flex flex-col gap-9 w-full">
              {posts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </ul>
            </InfiniteScroll>
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
