import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../../Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "@/redux/slices/postSlice";
import { PostData, CommentData, UserData } from "@/utils/interfaces/interface";
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
  const [showModal, setShowModal] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyValue, setReplyValue] = useState<string>("");
  const [postData, setPostData] = useState<PostData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState<string>("");
  const [commentLikes, setCommentLikes] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [replyLikes, setReplyLikes] = useState<{ [key: string]: boolean }>({});
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get-post/${post._id}`
        );
        const fetchedPostData = response.data.post;
        setPostData(fetchedPostData);
        setLikeCount(fetchedPostData.Likes.length);
        setComments(fetchedPostData.comments);
        const initialCommentLikes = fetchedPostData.comments.reduce(
          (acc: { [key: string]: boolean }, comment: CommentData) => {
            acc[comment._id] = comment?.likes.includes(userData.finduser._id);
            return acc;
          },
          {}
        );
        console.log(post)
      const like = post.Likes.map((item) => item.userId)
      console.log("the likes",like)
      for(let keys in like){
       if(like[keys] === userData.finduser._id){
        setLiked(true)
       } 
      }
       
      setCommentLikes(initialCommentLikes);
      const saved = userData.finduser.activity.saved
      console.log("the saved posts",saved)
  
      for(let keys in saved){
        if(saved[keys] === post._id){
          setSaved(true)
      }
      }

      
    }catch (error) {
        console.error("Error fetching post data:", error);
      }
    };



    fetchPostData();
  }, [post._id,userData.finduser._id]);



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
          profile: userData.finduser.profile.profileUrl,
        }
      );
     
      if (response.data.status) {
        console.log('New comment added response:', response.data.comment);
        const newComment = response.data.comment
        setComments(newComment);
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
      const response = await axios.delete(
        `http://localhost:3000/api/delete-comment/${commentId}`,
        {
          headers: {
            postId: post._id,
          },
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
        `http://localhost:3000/api/reply-to-comment/${commentId}`,
        {
          postId: post._id,
          userId: userData.finduser._id,
          username: userData.finduser.basicInformation.username,
          reply: replyValue,
        }
      );

      if (response.data.status) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  replies: [...comment.replies, response.data.reply],
                }
              : comment
          )
        );
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

  const handleEditComment = (commentId: string, commentText: string) => {
    setEditingCommentId(commentId);
    setEditingCommentText(commentText);
  };

  const handleSaveEditedComment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingCommentText.trim()) {
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/edit-comment/${post._id}`,
        {
          comment: editingCommentText,
          commentid: editingCommentId,
        }
      );

      if (response.data.status) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === editingCommentId
              ? { ...comment, text: editingCommentText }
              : comment
          )
        );
        setEditingCommentId(null);
        setEditingCommentText("");
        toast.success("Comment edited successfully.");
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
      const liked = commentLikes[commentId] || false;
      const response = await axios.post(
        `http://localhost:3000/api/like-comment/${commentId}`,
        {
          liked: !liked,
          userId: userData.finduser._id,
          postId: post._id,
        }
      );

      if (response.data.status) {
        
        setCommentLikes((prevLikes) => ({
          ...prevLikes,
          [commentId]: !liked,
        }));



     
        
        console.log("Comment liked successfully");
      } else {
        toast.error("Failed to like comment. Please try again.");
      }
    } catch (error) {
      console.error("Error liking comment:", error);
      toast.error("Error liking comment. Please try again.");
    }
  };

  const handleLikeReply = async (replyId: string) => {
    try {
      const liked = replyLikes[replyId] || false;
      const response = await axios.post(
        `http://localhost:3000/api/like-reply/${replyId}`,
        {
          liked: !liked,
          userId: userData.finduser._id,
        }
      );

      if (response.data.status) {
        setReplyLikes((prevLikes) => ({
          ...prevLikes,
          [replyId]: !liked,
        }));
        console.log("Reply liked successfully");
      } else {
        toast.error("Failed to like reply. Please try again.");
      }
    } catch (error) {
      console.error("Error liking reply:", error);
      toast.error("Error liking reply. Please try again.");
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
  const fetchUser = async (id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/getUserById/${id}`
      );
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const toggleReplies = (commentId: string) => {
    setShowReplies((prevShowReplies) => ({
      ...prevShowReplies,
      [commentId]: !prevShowReplies[commentId],
    }));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-between items-center z-24 mt-5">
      <div className="flex gap-2 mr-5">
        <img
          src={!liked ? "/assets/icons/like.svg" : "/assets/icons/liked.svg"}
          alt="like"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={handleLike}
        />
        <p className="text-sm">{likeCount}</p>
      </div>
      <div className="flex gap-1 items-center">
        <img
          src="/assets/icons/chat.svg"
          alt="comment"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="flex gap-2">
        <img
          src={!saved ? "/assets/icons/save.svg" : "/assets/icons/saved.svg"}
          alt="save"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={handleSavePost}
        />
      </div>
      {showModal && (
        <Modal onClose={closeModal}>
          <div className="p-2 max-w-3xl mx-auto">
            <h2 className="text-lg font-bold mb-2">Comments</h2>
            <button onClick={closeModal}>
              <X />
            </button>
            <div className="mb-4 overflow-auto h-80">
              {comments.map((comment) => (
                <div key={comment._id}>
                  <div className="text-sm mb-2 flex items-center">
                    <img
                      src={
                        comment.user?.profile?.profileUrl
                          ? `http://localhost:3000/profile/${comment.user?.profile?.profileUrl}`
                          : "https://avatar.iran.liara.run/public/boy"
                      }
                      alt={`${comment.username}'s profile`}
                      className="w-12 h-12 mr-2 rounded-full"
                      onLoad={() => fetchUser(comment.userId)}
                    />
                    <p className="font-bold gap-2 px-2">{comment.username}</p>
                    <p className="text-semibold text-xl text-indigo-400 border rounded-md">
                      "{comment.text}"
                    </p>
                    {comment.userId === userData.finduser._id && (
                      <>
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
                          />
                        </button>
                        <button
                          className="ml-2"
                          onClick={() =>
                            handleEditComment(comment._id, comment.text)
                          }
                        >
                          <img
                            src="/assets/icons/edit.svg"
                            alt="edit"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </button>
                      </>
                    )}
                    <button
                      className="text-blue-500 ml-auto"
                      onClick={() => handleLikeComment(comment._id)}
                    >
                      <img
                        src={
                          !commentLikes[comment._id]
                            ? "/assets/icons/like.svg"
                            : "/assets/icons/liked.svg"
                        }
                        alt="like"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                      />
                    </button>
                    <button
                      className="ml-2"
                      onClick={() => setReplyingTo(comment._id)}
                    >
                      Reply
                    </button>

                    <button
                      onClick={() => toggleReplies(comment._id)}
                      className="flex flex-col ml-5 text-indigo-500"
                    >
                      {showReplies[comment._id]
                        ? "Hide Replies"
                        : "Show Replies"}{" "}
                      ({comment?.replies?.length})
                    </button>
                  </div>
                  {showReplies[comment._id] && (
                    <div className="replies">
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-5 ">
                          {comment.replies.map((reply) => (
                            <div
                              key={reply._id}
                              className="text-sm mb-2 flex items-center border "
                            >
                              <img
                                src={"https://avatar.iran.liara.run/public/boy"}
                                alt={`${reply.username}'s profile`}
                                className="w-8 h-8 mr-2 rounded-full"
                              />
                              <p className="font-bold gap-2 px-2">
                                {reply.username}
                              </p>
                              <p className="text-semibold text-lg text-indigo-400">
                                "{reply.reply}"
                              </p>
                              <button
                                className="text-blue-500 ml-auto"
                                onClick={() => handleLikeReply(reply._id)}
                              >
                                <img
                                  src={
                                    !replyLikes[reply._id]
                                      ? "/assets/icons/like.svg"
                                      : "/assets/icons/liked.svg"
                                  }
                                  alt="like"
                                  width={24}
                                  height={24}
                                  className="cursor-pointer"
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {replyingTo && (
              <div className="mt-4 w-full">
                <form
                  onSubmit={(e) => handleReply(e, replyingTo)}
                  className="space-y-4"
                >
                  <textarea
                    value={replyValue}
                    onChange={(e) => setReplyValue(e.target.value)}
                    placeholder={`Reply to ${
                      comments.find((c) => c._id === replyingTo)?.username
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
            {editingCommentId && (
              <div className="mt-4 w-full">
                <form onSubmit={handleSaveEditedComment} className="space-y-4">
                  <textarea
                    value={editingCommentText}
                    onChange={(e) => setEditingCommentText(e.target.value)}
                    placeholder="Edit your comment"
                    className="w-full rounded-md p-3 border border-gray-300 focus:outline-none focus:border-blue-500"
                    required
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Save
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
