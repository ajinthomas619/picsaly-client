import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:3000/api/logout", { withCredentials: true });
            navigate('/adminlogin');
        } catch (error) {
            console.log(error);
            toast.error("Error in logging out");
        }
    };

    return (
        <nav className="bg-indigo-300  py-4 w-3/4 px-96 md:w-full">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link to="/admin" className="text-black font-bold text-xl ">
                    <h2>Admin</h2>
                </Link>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
