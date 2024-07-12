import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import GridPostList from "@/components/shared/GridPostList";
import { MdDelete } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert";
import PostStats from "@/components/shared/PostStats";
import { useSelector, useDispatch } from "react-redux";
import { removePost, setPost } from "@/redux/slices/postSlice";
import { UserData, PostData } from "@/utils/interfaces/interface";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Modal from "@/Modal/Modal";
import toast from "react-hot-toast";

const PostDetails = () => {
  const [posts, setPosts] = useState<PostData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.persisted.user.userData);

  useEffect(() => {
    if (!userData.finduser.basicInformation.username) {
      navigate("/log-in");
    }
  }, [navigate, userData]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/api/get-post/${id}`)
        .then((res: any) => {
          setPosts(res.data.post);
          setUser(res.data.user);
          setLoading(false);
        })
        .catch((error: any) => {
          console.error("Error fetching post data:", error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleDeletePost = () => {
    confirmAlert({
      title: "Confirm Delete Post",
      message: "Are you sure you want to delete this post?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await axios.delete(
                `http://localhost:3000/api/delete-post/${id}`
              );
              console.log("the response is ", response);
              if (response.status) {
                navigate("/");
                return { status: response.status, message: response.message };
              } else {
                return { status: response.status, message: response.message };
              }
            } catch (error) {
              console.log("error in deleting post", error);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const multiFormatDateString = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleReportSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/report-post/${id}`,
        { reason: reportReason, userId: userData.finduser._id },
        { withCredentials: true }
      );
      if (response.status) {
        toast.success("post reported successfully");
      } else {
        toast.error("there was a error in reporting post");
      }
      closeModal();
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="ml-48 mt-20">
      <div className="hidden md:flex max-w-5xl w-full ">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost"
        >
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
          width={700}
          src={`http://localhost:3000/profile/${
            posts?.image[0] || "public/assets/icons/profile-placeholder.svg"
          }`}
          alt="creator"
          className="post_details-img rounded-lg"
        />

        <div className="post_details-info">
          <div className="flex-between w-full">
            <Link
              to={`/profile/${posts?.createdBy._id}`}
              className="flex items-center gap-3"
            >
              <LazyLoadImage
                src={
                  `http://localhost:3000/profile/${posts?.createdBy?.profile?.profileUrl}` ||
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
                className={`${
                  userData?._id !== posts?.createdBy._id && "hidden"
                }`}
              >
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
                }`}
              >
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

        {posts?.createdBy._id === userData.finduser._id ? (
          <div className="flex flex-row justify-between gap-4 mt-8">
            <MdDelete
              className="rounded-lg w-6 h-6 bg-indigo-100 mt-2 "
              onClick={handleDeletePost}
            />
            <Link to={`/update-post/${id}`}>
              <img
                src="/public/assets/icons/edit.svg"
                alt="edit"
                width={20}
                height={20}
                className="mt-2"
              />
            </Link>
          </div>
        ) : (
          <Button onClick={openModal} variant="ghost">
            Report Post
          </Button>
        )}
        <h3 className="body-bold md:h3-bold w-full my-10">
          More Related Posts
        </h3>
      </div>

      {modalIsOpen && (
        <Modal onClose={closeModal}>
          <h2>Report Post</h2>
          <textarea
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            placeholder="Enter the reason for reporting the post"
            rows={4}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end mt-4">
            <Button onClick={handleReportSubmit} variant="ghost">
              Submit
            </Button>

            <Button onClick={closeModal} variant="ghost">
              Cancel
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PostDetails;
