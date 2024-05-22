import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../../Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "@/redux/slices/postSlice";
import { PostData, CommentData } from "@/utils/interfaces/interface";
import { Trash, X } from "lucide-react";

type PostStatsProps = {
  post: PostData;
};

const PostStats: React.FC<PostStatsProps> = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.persisted.user.userData);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [commentLiked,setCommentLiked] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyValue, setReplyValue] = useState<string>("");
  const [postData, setPostData] = useState<PostData | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get-post/${post._id}`
        );
        const fetchedPostData = response.data.post;
        setPostData(fetchedPostData)
        setLikeCount(fetchedPostData.Likes.length);
        setComments(fetchedPostData.comments);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [post._id]);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/like-post/${post._id}`,
        {
          postId: post._id,
          userId: userData.finduser._id,
          liked: !liked,
        }
      );

      if (response.data.status) {
        setLiked((prevLiked) => !prevLiked);
        setLikeCount(response.data.likes);
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post. Please try again.");
    }
  };

  const handleAddComment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!commentInput.trim()) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/comment-post/${post._id}`,
        {
          postId: post._id,
          userId: userData.finduser._id,
          name: userData.finduser.basicInformation.username,
          comment: commentInput,
        }
      );
      console.log("the response of add comment",response)

      if (response.data.status) {
        setComments((prevComments) => [
          ...prevComments,
          response.data.comment,
        ]);
        setCommentInput("");
        toast.success("Comment added successfully.");
      } else {
        toast.error("Failed to add comment. Please try again.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Error adding comment. Please try again.");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      console.log("commentid",commentId)
    
      const response = await axios.delete(
        `http://localhost:3000/api/delete-comment/${commentId}`,{
          headers:{
            postId:post._id
          }
        }
      );
      if (response.data.status) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
      );
      toast.success("Comment deleted successfully.");
    } else {
      toast.error("Failed to delete comment. Please try again.");
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    toast.error("Error deleting comment. Please try again.");
  }
};

const handleReply = async (event: React.FormEvent, commentId: string) => {
  event.preventDefault();
  if (!replyValue.trim()) {
    return;
  }
  
  try {
    const response = await axios.post(
      `http://localhost:3000/api/replytocomment/${commentId}`,
      {
        postId: post._id,
        userId: userData.finduser._id,
          username: userData.finduser.basicInformation.username,
          reply: replyValue,
        }
      );
      
      if (response.data.status) {
        setReplyValue("");
        setReplyingTo(null);
        toast.success("Reply successful.");
      } else {
        toast.error("Failed to reply. Please try again.");
      }
    } catch (error) {
      console.error("Error replying to comment:", error);
      toast.error("Error replying to comment. Please try again.");
    }
  };
  
  const handleEditComment = async (commentId: string, comment: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/edit-comment/${commentId}`,
        {
          comment,
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setCommentInput(comment);
      } else {
        toast.error("Failed to edit comment. Please try again.");
      }
    } catch (error) {
      console.error("Error editing comment:", error);
      toast.error("Error editing comment. Please try again.");
    }
  };
  
  const handleLikeComment = async (commentId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/like-comment/${commentId}`,
        {
          liked,
          userId: userData.finduser._id,
          postId: post._id,
          withCredentials: true,
        }
      );
      
      if (response.data.status) {
        setCommentLiked(true)
        console.log("Comment liked successfully");
      } else {
        toast.error("Failed to like comment. Please try again.");
      }
    } catch (error) {
      console.error("Error liking comment:", error);
      toast.error("Error liking comment. Please try again.");
    }
  };
  
  const handleSavePost = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/savepost`, {
        postId: post._id,
        userId: userData.finduser._id,
      });
      
      if (response.status) {
        setSaved(true);
        toast.success("Post saved successfully.");
      } else {
        toast.error("Failed to save post. Please try again.");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Error saving post. Please try again.");
    }
  };
  console.log("commentsss",comments)
  
  const closeModal = () => {
    setShowModal(false);
  };
  
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={!liked ? "/assets/icons/like.svg" : "/assets/icons/liked.svg"}
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleLike}
        />
        <p className="text-sm">{likeCount}</p>
      </div>
      <div className="flex gap-1 items-center">
        <img
          src="/assets/icons/chat.svg"
          alt="comment"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="flex gap-2">
        <img
          src={!saved ? "/assets/icons/save.svg" : "/assets/icons/saved.svg"}
          alt="save"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleSavePost}
        />
      </div>
      {showModal && (
        <Modal onClose={closeModal}>
          <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-lg font-bold mb-2 ">Comments</h2>
            <button onClick={closeModal} >
              <X />
            </button>
            <div className="mb-4 ">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="text-sm mb-2 flex items-center"
                >
                  <img
                    src={`http://localhost:3000/profile/${postData?.createdBy.profile.profileUrl}`}
                    alt={`${comment?.username}'s profile`}
                    className="w-12 h-12 mr-2 rounded-full"
                  />
                  <div>
                    <p className="font-semibold tex-lg">{comment.name}</p>
                    {comment?._Id === userData._id && (
                      <>
               
                        <p>{comment.text}</p>
                        <button
                          className="ml-2"
                          onClick={() =>
                            handleEditComment(comment._id, comment.text)
                          }
                        >
                        <img 
                        src='/public/assets/icons/edit.svg'
                        alt="'edit"
                        className="w-4 h-4 cursor-pointer "/>
                        </button>
                      </>
                    )}
                  </div>
                  <button
                    className="text-blue-500 ml-auto"
                    onClick={() => handleLikeComment(comment._id)}
                  >
                    <img
                      src={
                        !commentLiked
                          ? "/assets/icons/like.svg"
                          : "/assets/icons/liked.svg"
                      }
                      alt="like"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={() => handleLikeComment(comment._id)}
                    />
                  </button>
                  <button
                    className="ml-2"
                    onClick={() => setReplyingTo(comment._id)}
                  >
                    Reply
                  </button>
                  <button
                  className="text-blue-500 ml-auto"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    <img
                      src="/assets/icons/delete.svg"
                      alt="delete"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={() => handleDeleteComment(comment._id)}
                    />
                  </button>
                </div>
              ))}
            </div>
            {replyingTo && (
              <div className="mt-4 w-full">
                <form onSubmit={(e) => handleReply(e, replyingTo)} className="space-y-4">
                  <textarea
                    value={replyValue}
                    onChange={(e) => setReplyValue(e.target.value)}
                    placeholder={`Reply to ${
                      comments.find((c) => c._id === replyingTo)?.name
                    }`}
                    className="w-full rounded-md p-3 border border-gray-300 focus:outline-none focus:border-blue-500"
                    required
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Reply
                    </button>
                  </div>
                </form>
              </div>
            )}
            <form onSubmit={handleAddComment} className="space-y-4">
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add a comment..."
                className="w-full rounded-md p-3 border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PostStats;
