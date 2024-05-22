import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import GridPostList from '@/components/shared/GridPostList';
import PostStats from "@/components/shared/PostStats";
import { useSelector, useDispatch } from 'react-redux';
import { removePost, setPost } from "@/redux/slices/postSlice";
import { UserData, PostData } from "@/utils/interfaces/interface";
import axios from "axios";



const PostDetails = () => {
 const [posts, setPosts] = useState<PostData | null>(null);
 const [user, setUser] = useState<UserData | null>(null);
 const [loading, setLoading] = useState(true); // Add loading state

 const navigate = useNavigate();
 const { id } = useParams();
 const dispatch = useDispatch();
 const userData = useSelector((state: any) => state.persisted.user.userData);
 

 useEffect(() => {
    if (!userData.finduser.basicInformation.username) {
      navigate("/log-in");
    }
 }, []);

 useEffect(() => {
    if (id) {
      setLoading(true); // Set loading to true before fetching
      axios.get(`http://localhost:3000/api/get-post/${id}`)
        .then((res: any) => {
          setPosts(res.data.post);
          setUser(res.data.user);
          setLoading(false); // Set loading to false after fetching
        })
        .catch((error: any) => {
          console.error("Error fetching post data:", error);
          setLoading(false); // Ensure loading is set to false even on error
        });
    }
 }, []); 
 // Include post in the dependency array
console.log("the post details after use effect",posts)
 const handleDeletePost = () => {
    dispatch(removePost(posts?._id));
 };

 const multiFormatDateString = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    return formattedDate;
 };

 if (loading) {
    return <Loader />; // Show a loader while fetching data
 }

 return (
    <div>
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost">
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      <div className="post_details-card">
        <img
          width ={700}
           src={`http://localhost:3000/profile/${posts?.image[0] || 'public/assets/icons/profile-placeholder.svg'}`} 
          
          alt="creator"
          className="post_details-img rounded-lg"
        />

        <div className="post_details-info">
          <div className="flex-between w-full">
            <Link
              to={`/profile/${posts?.createdBy._id}`}
              className="flex items-center gap-3">
              <img
                src={
                 `http://localhost:3000/profile/${posts?.createdBy?.profile?.profileUrl }`||
                 "/assets/icons/profile-placeholder.svg"
                }
                alt="creator"
                className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
              />
              <div className="flex gap-1 flex-col">
                <p className="base-medium lg:body-bold text-light-1">
                 {posts?.createdBy?.basicInformation?.username}
                </p>
                <div className="flex-center gap-2 text-light-3">
                 <p className="subtle-semibold lg:small-regular ">
                    {multiFormatDateString(posts?.createdAt)}
                 </p>
                 •
                 <p className="subtle-semibold lg:small-regular">
                    {posts?.location}
                 </p>
                </div>
              </div>
            </Link>

            <div className="flex-center gap-4">
              <Link
                to={`/update-post/${posts?._id}`}
                className={`${userData?._id !== posts?.createdBy._id && "hidden"}`}>
                <img
                 src={"/assets/icons/edit.svg"}
                 alt="edit"
                 width={24}
                 height={24}
                />
              </Link>

              <Button
                onClick={handleDeletePost}
                variant="ghost"
                className={`post_details-delete_btn ${
                 userData?._id !== posts?.createdBy._id && "hidden"
                }`}>
                <img
                 src={"/assets/icons/delete.svg"}
                 alt="delete"
                 width={24}
                 height={24}
                />
              </Button>
            </div>
          </div>

          <hr className="border w-full border-dark-4/80" />

          <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
            <p>{posts?.caption}</p>
        
          </div>

          <div className="w-full">
            <PostStats post={posts} user={userData._id} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl">
        <hr className="border w-full border-dark-4/80" />

        <h3 className="body-bold md:h3-bold w-full my-10">
          More Related Posts
        </h3>

      </div>
    </div>
 );
};

export default PostDetails;
