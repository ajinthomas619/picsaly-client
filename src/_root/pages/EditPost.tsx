import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "@/utils/interfaces/interface";
import { setPost } from "@/redux/slices/postSlice";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PostForm from "../../components/forms/PostForm";

const EditPost = () => {
  const user = useSelector((state: UserData) => state.persisted.user.userData);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [post, setPost] = useState<any>({});



  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/get-post/${id}`);
        setPost(response.data.post);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

 

 

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img src="/assets/icons/edit.svg" width={36} height={36} alt="edit" className="invert-white" />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <PostForm action="update" post={post}  />
        )}
      </div>
    </div>
  );
};

export default EditPost;
