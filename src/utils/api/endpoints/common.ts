import { AUTH_URL,USER_URL,POST_URL } from "../baseUrl/axios.baseUrl";


// AUTH SERVICE

export const Login_Api = `${AUTH_URL}/login`; 
export const Logout_Api = `${AUTH_URL}/logout`
export  const Signup_Api = `${AUTH_URL}/signup`
export const VerifyOTP_Api = `${AUTH_URL}/verify-otp`
export const GoogleLogin_Api = `${AUTH_URL}/googleLogin`;
export const AdminLogin_Api = `${AUTH_URL}/adminlogin`; 
export const RefreshToken_Api = `${AUTH_URL}/refresh`; //?


// USER SERVICE
export const getUserData_Api = `${USER_URL}/getUserData`;
export const getAllUsers_Api = `${USER_URL}/getAllUsers`;
export const searchUser_Api = `${USER_URL}/getSearchUser`
export const addProfile_Api = `${USER_URL}/addProfile`;
export const  updateProfile_Api = `${USER_URL}/editProfile`;
export const addProfileImage_Api = `${USER_URL}/addProfileImage`;
export const getUser_Api = `${USER_URL}/getUserById`;
export const getUserByName_Api = `${USER_URL}/getUserByUserName`;
export  const FollowUnfollowUser_Api = `${USER_URL}/followUser`

//POST SERVICE
export const createPost_Api = `${POST_URL}/create-post`;
export const getPost_Api = `${POST_URL}/get-post`;
export  const deletePost_Api= `${POST_URL}/delete-post`;
export const likePost_Api = `${POST_URL}/like-post`;
export const updatePost_Api = `${POST_URL}/edit-post`
export const commentPost_Api = `${POST_URL}/comment-post`
export const getAllPost_Api  = `${POST_URL}/all-post`;``