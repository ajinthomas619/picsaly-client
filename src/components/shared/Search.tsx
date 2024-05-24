import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from '../../lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import axios from 'axios';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

const Search: React.FC = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [q, setQ] = useState<string>('');
    const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
    const userData = useSelector((state: any) => state.persisted.user.userData);

    const fetchData = useCallback(debounce(async (query: string) => {
        if (query.trim() === '') {
            setPosts([]);
            setUsers([]);
            setSearchPerformed(false); // No search is performed when the query is empty
            return;
        }

        try {
            const usersResponse = await axios.get(`http://localhost:3000/api/getSearchUser/${query}`);
            const postsResponse = await axios.get(`http://localhost:3000/api/search-post/${query}`);
              

            console.log("the post response",postsResponse)
            console.log ("the user response",usersResponse)
            setPosts(postsResponse.data.posts);
            setUsers(usersResponse.data.data);
            setSearchPerformed(true); // Search has been performed
        } catch (error) {
            console.error("Error fetching data", error);
            setSearchPerformed(true); // Search has been performed, even if there was an error
        }
    }, 500), []);
    
    useEffect(() => {
        fetchData(q);
    }, [q, fetchData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQ(e.target.value);
    };
    
                console.log("the result post", posts);
                console.log("the result users", users);
    
    return (
        <div>
            
            <Input type="text" value={q} onChange={handleInputChange} placeholder="Search..." />
            <div >
             
                {searchPerformed && posts?.length === 0 && users?.length ===0 && <p>No posts found</p>}
                {posts?.length > 0 && (
                    posts.map(post => (
                        <div key={post._id} className='card card-body card-bordered card-normal'>
                            <h3>{post.caption}</h3>
                            <Link to={`/post/${post._id}`}>
                            <img
                      src={`http://localhost:3000/profile/${post.image}`}
                      alt={`${post.image}'s profile`}
                      className="w-32 h-32  object-cover"
                    />
                    </Link>
                        </div>
                    ))
                )}
            </div>
            <div >
              
                {searchPerformed && users?.length === 0 && posts.length === 0 && <p>No users found</p>}
                {users?.length > 0 && (
                    users.map(user => (
                        <div key={user._id} className='card card-body card-bordered card-normal'>

                            <h3>{user.basicInformation.username}</h3>
                            <Link to={`/profile/${user._id}`}>
                            <img
                      src={`http://localhost:3000/profile/${user.profile.profileUrl}`}
                      alt={`${user?.basicInformation?.username}'s profile`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    </Link>
                   
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Search;
