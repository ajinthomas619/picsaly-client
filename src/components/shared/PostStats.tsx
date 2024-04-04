import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import Modal from "../../Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "@/redux/slices/postSlice";
import { PostData, CommentData } from "@/utils/interfaces/interface";
import { Trash } from "lucide-react";
import {X} from "lucide-react"


type PostStatsProps = {
  post: PostData;

};

const PostStats: React.FC<PostStatsProps> = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.persisted.user.userData);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [newComments, setNewComments] = useState<CommentData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    if (!userData.username) {
      navigate("/login");
    }
  }, [navigate, userData.username]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/post/get-post/${post._id}`);
        const postData = response.data.post;

        setLikeCount(postData.Likes.length); // Count of likes
        setNewComments(postData.comments); // Set comments
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchData();
  }, [post._id]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:3002/api/post/like-post/${post._id}`, {
        postId: post._id,
        userId: userData._id,
        liked: !liked
      });
      if (response.data.status) {
        setLiked(prevLiked => !prevLiked);
        setLikeCount(response.data.likes); // Update like count from response
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post. Please try again.");
    }
  };

  const handleAddComment = async () => {
    if (!commentInput.trim()) {
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3002/api/post/comment-post/${post._id}`, {
        postId: post._id,
        userId: userData._id,
        name: userData.userName,
        comment: commentInput
      });
      console.log("response of add comment",response);
      
      
      if (response.data.status) {
        const newComment = response.data.comment[0];
        setNewComments(prevNewComments => [...prevNewComments, newComment]);
        setCommentInput("");
        toast.success("Comment added successfully.");
      } else {
        console.error("Failed to add comment. Please try again.");
        toast.error("Failed to add comment. Please try again.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Error adding comment. Please try again.");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await axios.delete(`http://localhost:3002/api/comment/delete/${commentId}`);
      if (response.data.status) {
        setNewComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
        toast.success("Comment deleted successfully.");
      } else {
        console.error("Failed to delete comment. Please try again.");
        toast.error("Failed to delete comment. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Error deleting comment. Please try again.");
    }
  };
  const handleSave = async() => {
    const data = {
      postId:post._id,
      userId:userData._id
    }
    try{
      const response = await axios.post(`http://localhost:3001/api/user/savepost`,data)
      console.log("response of save post",response);
      
      if(response.status){
        toast.success("post saved successfully")
      }
      else{
        toast.error("failed.to save post")
      }
    }catch(error){
      console.error("error in savving post",error)
    }
  }
  
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={`${!liked ? "/public/assets/icons/like.svg" : "/public/assets/icons/liked.svg"}`}
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
          src="/public/assets/icons/chat.svg"
          alt="comment"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="flex gap-2">
        <img
          src="/public/assets/icons/save.svg"
          alt="save"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleSave}
        />
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Comments</h2>
            <button onClick={closeModal}>
            <X />
          </button>
            <div className="mb-4">
              {newComments.map((comment, index) => (
                <div key={index} className="text-sm mb-2">
                  <div className="flex justify-between">
                    <p className="font-semibold">{comment.name}</p>
                    {comment._id === userData._id && (
                      <button
                        className="text-red-500"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        <Trash size={20} />
                      </button>
                    )}
                  </div>
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleAddComment}>
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add a comment..."
                className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
              <div className="flex justify-end mt-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PostStats;
