import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import FileUploader from "../shared/FileUploader";
import { useDispatch, useSelector } from "react-redux";
import { addPostData } from "@/redux/slices/postSlice";
import { createPostFunction, updatePostFunction } from "@/utils/api/methods/PostService/post";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import {Button} from"../ui/button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PostData } from "@/utils/interfaces/interface";
import toast from "react-hot-toast";
type PostFormProps = {
  post?: PostData;
  action: "Create" | "update";
};

const formSchema = z.object({
  caption: z.string().min(5),
  image: z.custom<File[]>(),
  location: z.string().min(2),
  tags: z.string(),
  createdBy: z.string(),
});

const PostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate()
  console.log("post fo updation",post);
  const user = useSelector((state: any) => state.persisted.user.userData);
  
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      caption: post?.caption || "",
      image: post?.image[0]||"",
      location: post?.location || "",
      tags: (post?.tags || []).join(",") || "",
      createdBy: post?.createdBy || user.finduser._id,
    },
  });
  

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (action === "Create" && (!values.image || values.image.length === 0)) {
      toast.error("Please add an image.");
      return;
    }
    try{
    const formData = new FormData();
    formData.append("image", values.image[0]);
    formData.append("caption", values.caption);
    formData.append("location", values.location);
    formData.append("tags", values.tags);
    formData.append("createdBy", values.createdBy);
console.log("form data before submission",formData);
console.log("action is ",action);

    if (action === "Create") {
      await createPostFunction(formData);
      dispatch(addPostData(formData));
       navigate("/")
    } else if (action === "update" && post) {
      console.log("hi");
      
      await  axios.put(`http://localhost:3000/api/edit-post/${post._id}`, formData,{
        withCredentials:true
      });
      console.log("form data after submission",formData);
      
      navigate("/")
     
    }
  }
  catch(error){
    console.log("error in edit post",error)
  }

  };

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl ml-48 mt-20">
      <Textarea
        className="shad-textarea custom-scrollbar"
        placeholder="Caption"
        {...form.register("caption")}
      />
     
     <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Photo</FormLabel>
            <FormControl>
            <FileUploader
            name="image"
            fieldChange={field.onChange}
            mediaUrl={post?.image[0]}
            
            />           

            </FormControl>
           
            <FormMessage className="shad-form_message"/>
          </FormItem>
        )}
      />
      <Input type="text" className="shad-input" placeholder="Location" {...form.register("location")} />
      <Input
        type="text"
        className="shad-input"
        placeholder="Tags (separated by comma)"
        {...form.register("tags")}
      />
      <Input type="hidden" {...form.register("createdBy")} />
      <div className="flex gap-4 items-center justify-end">
        <Button type="button" className="shad-button_dark_4" onClick={() => form.reset()}>
          Cancel
        </Button>
        <Button type="submit" className="shad-button_primary whitespace-nowrap">
          {action === "Create" ? "Create" : "update"}
        </Button>
      </div>
    </form>
    </Form>
  );
};

export default PostForm;
