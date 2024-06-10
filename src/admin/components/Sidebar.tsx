import React,{useState} from 'react'
import {Link,useLocation} from 'react-router-dom'

const Sidebar:React.FC = () => {
    const location = useLocation()
    const [activeTab,setActiveTab] = useState<string>('admin')

    const setActive = (tab:string) => {
        setActiveTab(tab)
    }
  return (
    <div className='bg-gray-800 h-full w-[341px] fixed top-0 left-0 flex flex-col justify-between'>
        <div className='mt-4 mb-8 px-4 gap-2'>
            <h1 className='text-white text-2xl font-bold mb-4'>Admin</h1>
            <ul className='space y-10 mt-32'>
                <li>
                    <Link to="/admin"
                    className={`hover:text-red-500 transistion duration-300 p-1 rounded-lg w-full ${
                        location.pathname === '/*'? 'font-semibold bg-white text-black':'text-white'
                    }`}
                   onClick = {() => setActive('admin')}
                   >
                    Admin Home
                   </Link>
                </li>
                <Link to="/admin/user-management"
                className={`hover:text-red-500 transistion duration-300 p-1 rounded-lg w-full ${
                    activeTab === 'user'? 'font-semibold bg-white text-black':'text-white'
                }`}
                onClick={() => setActive('user')}
                >
                    User Management
                </Link>
                <li>
                    <Link to='/admin/post-management'
                    className={`hover:text-red-500 transistion duration-300 p-1 rounded-lg w-full ${
                        activeTab === 'post'? 'font-semibold bg-white text-black':'text-white'
                    }`}
                    onClick={() => setActive('post')}>
                        Post Management
                    </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar