import { BASE_URL } from "../baseUrl/axios.baseUrl";


// AUTH SERVICE

export const Login_Api = `${BASE_URL}/login`; 
export const Logout_Api = `${BASE_URL}/logout`
export  const Signup_Api = `${BASE_URL}/signup`
export const VerifyOTP_Api = `${BASE_URL}/verify-otp`
export const GoogleLogin_Api = `${BASE_URL}/googleLogin`;
export const AdminLogin_Api = `${BASE_URL}/adminlogin`; 
export const RefreshToken_Api = `${BASE_URL}/refresh`; //?


// USER SERVICE
export const getUserData_Api = `${BASE_URL}/getUserData`;
export const getAllUsers_Api = `${BASE_URL}/getAllUsers`;
export const searchUser_Api = `${BASE_URL}/getSearchUser`
export const addProfile_Api = `${BASE_URL}/addProfile`;
export const  updateProfile_Api = `${BASE_URL}/editProfile`;
export const addProfileImage_Api = `${BASE_URL}/addProfileImage`;
export const getUser_Api = `${BASE_URL}/getUserById`;
export const getUserByName_Api = `${BASE_URL}/getUserByUserName`;
export  const FollowUnfollowUser_Api = `${BASE_URL}/followUser`

//POST SERVICE
export const createPost_Api = `${BASE_URL}/create-post`;
export const getPost_Api = `${BASE_URL}/get-post`;
export  const deletePost_Api= `${BASE_URL}/delete-post`;
export const likePost_Api = `${BASE_URL}/like-post`;
export const updatePost_Api = `${BASE_URL}/edit-post`
export const commentPost_Api = `${BASE_URL}/comment-post`
export const getAllPost_Api  = `${BASE_URL}/all-post`;``
export const getPostForHome_Api = `${BASE_URL}/show-post`