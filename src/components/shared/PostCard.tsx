import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserFunction } from "@/utils/api/methods/UserService/post";
import { UserData } from "@/utils/interfaces/interface";
import { useSelector } from "react-redux";
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl";

import PostStats from "./PostStats";

type PostCardProps = {
  post: any;
};

const PostCard = ({ post }: PostCardProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const user = useSelector((state: any) => state.persisted.user.userData);
 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = post?.createdBy?._id;
        const response = await axios.get(
          `${BASE_URL}/getUserById/${id}`,{
            withCredentials:true
          }
        );
     
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error while fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  const formattedDate = post?.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString()
    : "";

  return (
    <div className="post-card flex flex-col px-4 py-4 md:ml-96 md:mr-48 md:mt-8   ">
      {userData && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${userData?._id}`}>
              <LazyLoadImage
                src={
                  userData
                    ? `${import.meta.env.VITE_APP_BASE_URL}/profile/${
                       // @ts-ignore
                        userData.profile.profileUrl ||
                        "https://avatar.iran.liara.run/public/boy"
                      }`
                    : ""
                }
                alt="user"
                className="rounded-full w-12 lg:h-12"
              />
            </Link>

            <div className="flex flex-col">
              <p className="base-medium lg:body-bold text-light-1">
                {post.createdBy.basicInformation.username}
              </p>
              <div className="flex-center gap-2 text-light-3">
                <p className="subtle-semibold lg:small-regular">
                  {formattedDate}
                </p>
                <p className="subtle-semibold lg:small-regular">
                  {post.location}
                </p>
              </div>
            </div>
          </div>
          {post.createdBy._id !== user.finduser._id ? (
            <></>
          ) : (
            <Link to={`/update-post/${post._id}`}>
              <img
                src="/public/assets/icons/edit.svg"
                alt="edit"
                width={20}
                height={20}
              />
            </Link>
          )}
        </div>
      )}
      <div className="w-full h-4/5">
        <Link to={`/post/${post._id}`}>
          <div className="small-medium lg:base-medium py-5 ">
            <p>{post.caption}</p>
            <ul className="flex gap-1 mt-2">
              {post.Tags.map((tag: string) => (
                <li key={tag} className="text-light-3">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
          <LazyLoadImage
            width={400}
            height={300}
            src={`${import.meta.env.VITE_APP_BASE_URL}/profile/${
              post?.image[0] || "public/assets/icons/profile-placeholder.svg"
            }`}
            className="post-card_img rounded-lg "
            alt="post image"
          />
        </Link>
        <PostStats
         // @ts-ignore
        post={post} userId={user?.finduser._id} />
      </div>
    </div>
  );
};

export default PostCard;
