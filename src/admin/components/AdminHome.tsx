import UsersPerMonth from "./NewUsersPerMonth";
import PostsPerMonth from "./PostsPerMonth";

const AdminHome = () => {
    return (  
        <div className="flex flex-col justify-center items-center ml-10 mt-10 flex-wrap gap-10">
            <div className=" shadow-sm w-full md:w-full  p-36">
                <PostsPerMonth />
            </div>
            <div className=" shadow-sm w-full md:w-full  p-36">
                <UsersPerMonth />
            </div>
        </div>
    );
}

export default AdminHome;
