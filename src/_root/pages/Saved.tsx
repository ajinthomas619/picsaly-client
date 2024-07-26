
import { useSelector } from "react-redux"
import { UserData } from "@/utils/interfaces/interface"
import { Link, useNavigate } from "react-router-dom"
import { useEffect,useState } from "react"

import { debounce } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { PostData } from "@/utils/interfaces/interface"
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl";


const Saved = () => {
  const userData = useSelector( (state:UserData) => state.persisted.user.userData)
  const id = userData.finduser._id

  const navigate = useNavigate()




  const [posts,setPosts] = useState<PostData[]>([])
  const [q,setQ] = useState<string>('')
 
  const fetchPosts =async() => {
    try{
      const response =  await axios.post(`${BASE_URL}/get-saved-post/${userData.finduser._id}`,{
        withCredentials:true
      })
      setPosts(response.data.posts)
   
    }
    catch(error){
      console.error("Error fetching users:",error)
    }
  }
  useEffect(() => {
    const debouncedFetchPosts = debounce(fetchPosts,300)

    if(q.trim()!== ''){
      debouncedFetchPosts()
    }
    else{
      fetchPosts()
    }

    return () => {
      debouncedFetchPosts.cancel()
    }
  },[q])

  useEffect(() => {
    fetchPosts()
  },[])
  
  const handleButtonClick = () =>{
    fetchPosts()
  }
  console.log("postsssssss",posts);


  return (
    <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
 
 <h2 className="h3-bold md:h2-bold text-left flex-1 justify-start">Saved Posts</h2>


    <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 py-4'>
    {posts.length > 0 ? posts.map((post) => (
      <Link to={`/post/${post._id}`}>
      <LazyLoadImage
  key={post._id}
  src={`${import.meta.env.VITE_APP_BASE_URL}/profile/${post.image[0]}`}
  alt="Profile"
  className="w-64 h-64 object-cover rounded-lg"
  loading="lazy"
/>
</Link>
)) : 'No Post found'}       </div>
</div>
  )
}

export default Saved
