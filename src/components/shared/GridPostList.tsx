import { Link } from "react-router-dom";

import PostStats from "./PostStats";
import {  useSelector } from "react-redux";
import { PostData } from "@/utils/interfaces/interface";


type GridPostListProps = {
  posts: PostData[]; // Assuming Post is the type of your MongoDB documents
  showUser?: boolean;
  showStats?: boolean;
};
interface UserData {
  id: string;
  username:string
  
 }

 interface User {
  userData: UserData;
 }
 
 interface Persisted {
  user: User;
 }

 interface RootState {
  persisted: Persisted;
 }
 





const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
 
  const user = useSelector((state:RootState) => state.persisted.user.userData);

  return (
    <ul className="grid-container">
      {posts?.map((post) => (
        <li key={post._id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post._id}`} className="grid-post_link">
            <img
              src={post.image[0]}
              alt="post"
              className="h-full w-full object-cover"
            
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    post.createdBy?.profilePicture ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post.createdBy.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;

