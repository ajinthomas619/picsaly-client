import PostForm from "@/components/forms/PostForm"


const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container w-full items-center">
    <div className="max-w-5xl flex-start gap-3 justify-start w-full items-center">
      <img src="./public/assets/icons/add-post.svg"
      width={36}
      height={36}
      className="bg-black"
      alt="add"/>
      <h2 className="h3-bold md:h2-bold text-left flex-1">Create Post</h2>
     

    </div>
    <PostForm action="Create"/>


      </div>



    </div>
  )
}

export default CreatePost