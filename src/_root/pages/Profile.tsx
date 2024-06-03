import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { LikedPost } from ".";
import { Loader } from "lucide-react";
import GridPostList from "@/components/shared/GridPostList";
import { useEffect, useState } from "react";
import axios from "axios";
import CreatedPost from "./CreatedPosts";
import { LazyLoadImage } from 'react-lazy-load-image-component';


const StatBlock = ({ value, label }) => (
  <div className="flex flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [followUser, setFollowUser] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();

  const User = useSelector((state) => state.persisted.user.userData);
  const userId = User?.finduser?._id;
  console.log("iddd", id);

  const navigate = useNavigate()

  useEffect(() => {
    if (!userId) {
    
      navigate("/log-in");
    } 
    
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/getUserById/${id}`
        );
        console.log("the response data", response.data.data);
        setCurrentUser(response.data.data);
        if (
          response.data.data?.socialConnections?.Followers?.includes(userId)
        ) {
          setFollowUser(true);
        }
      } catch (error) {
        console.error("Error while fetching user data", error);
      }
    };

    fetchUserData();
  }, [id, userId]);

  const follow = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/followUser",
        {
          currentUserId: userId,
          followedUserid: id,
        }
      );
      console.log("the response is", response);
      if (response.status) {
        setFollowUser((prev) => !prev);
      }
    } catch (error) {
      console.log("error following user", error);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <LazyLoadImage
            src={
              currentUser
                ? `http://localhost:3000/profile/${
                    currentUser?.profile?.profileUrl ||
                    "https://avatar.iran.liara.run/public/boy"
                  }`
                : ""
            }
            alt="profile"
            className="w-36 h-36 lg:h-36 lg:w-36 rounded-full "
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
              {currentUser?.basicInformation?.username}
            </p>
            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts || 0} label="Posts" />
              <StatBlock
                value={currentUser?.socialConnections?.Followers.length || 0}
                label="Followers"
              />
              <StatBlock
                value={currentUser?.socialConnections?.Following.length || 0}
                label="following"
              />
            </div>
            <div>
              <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
                {currentUser?.profile?.Bio}
              </p>
            </div>
            <div className="flex justify-center gap-4">
              {userId === currentUser._id ? (
                <Link
                  to={`/update-profile/${userId}`}
                  className="h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg"
                >
                  <img
                    src={"/public/assets/icons/edit.svg"}
                    alt="edit"
                    width={20}
                    height={20}
                  />
                  <p className="flex whitespace-nowrap small-medium">
                    Edit Profile
                  </p>
                </Link>
              ) : (
                <Button
                  type="button"
                  className="shad-button_primary px-8"
                  onClick={follow}
                >
                  {followUser ? "Unfollow" : "Follow"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-5xl w-full gap-2 py-4">
        <Link
          to={`/profile/${id}/created-posts`}
          className={`profile-tab gap-2 rounded-1-lg ${
            pathname === `/profile/${id}/created-post` && "!bg-dark-3"
          }`}
        >
          <img
            src={"/public/assets/icons/posts.svg"}
            alt="posts"
            width={20}
            height={20}
          />
        </Link>
        <Link
          to={`/profile/${id}/liked-posts`}
          className={`profile-tab gap-2 rounded-r-lg ${
            pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
          }`}
        >
          <img
            src={"/public/assets/icons/like.svg"}
            alt="like"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser?._id && (
          <>
            <Route path="/liked-posts" element={<LikedPost />} />
            <Route path="/created-posts" element={<CreatedPost />} />
          </>
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
