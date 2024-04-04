
import UserForm from "@/components/forms/UserForm"


const UpdateProfile= () => {
  return (
    <div className="flex flex-1">
      <div className="common-container w-full items-center">
    <div className="max-w-5xl flex-start gap-3 justify-start w-full items-center">
      <img src="./public/assets/icons/add-post.svg"
      width={36}
      height={36}
      className="bg-black"
      alt="add"/>
      <h2 className="h3-bold md:h2-bold text-left flex-1">Update Profile</h2>
     

    </div>
    <UserForm/>


      </div>



    </div>
  )
}

export default UpdateProfile