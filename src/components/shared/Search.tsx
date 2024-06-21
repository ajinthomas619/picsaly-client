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
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const userData = useSelector((state: any) => state.persisted.user.userData);

    const fetchData = useCallback(debounce(async (query: string) => {
        if (query.trim() === '') {
            setPosts([]);
            setUsers([]);
            setSearchPerformed(false); // No search is performed when the query is empty
            setShowDropdown(false); // Hide the dropdown when the query is empty
            return;
        }

        try {
            const usersResponse = await axios.get(`http://localhost:3000/api/getSearchUser/${query}`);
            const postsResponse = await axios.get(`http://localhost:3000/api/search-post/${query}`);

            console.log("the post response", postsResponse)
            console.log("the user response", usersResponse)
            setPosts(postsResponse.data.posts);
            setUsers(usersResponse.data.data);
            setSearchPerformed(true); // Search has been performed
            setShowDropdown(true); // Show the dropdown when search results are available
        } catch (error) {
            console.error("Error fetching data", error);
            setSearchPerformed(true); // Search has been performed, even if there was an error
            setShowDropdown(true); // Show the dropdown even if there was an error
        }
    }, 500), []);

    useEffect(() => {
        fetchData(q);
    }, [q, fetchData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQ(e.target.value);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowDropdown(false); // Hide the dropdown when the input loses focus
        }, 100);
    };

    console.log("the result post", posts);
    console.log("the result users", users);

    return (
        <div className="relative">
            <Input
                type="text"
                value={q}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Search..."
                className="input input-bordered w-full mb-4"
                onFocus={() => setShowDropdown(true)} // Show the dropdown when the input is focused
            />
            {showDropdown && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10 rounded-md mt-1">
                    <div className='p-4'>
                        {searchPerformed && posts.length === 0 && users.length === 0 && <p>No results found</p>}
                        {posts.length > 0 && (
                            posts.map(post => (
                                <div key={post._id} className='p-4 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-80 mb-2'>
                                    <h3>{post.caption}</h3>
                                    <Link to={`/post/${post._id}`}>
                                        <img
                                            src={`http://localhost:3000/profile/${post.image}`}
                                            alt={`${post.image}'s profile`}
                                            className="w-32 h-32 object-cover"
                                        />
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                    <div className='p-4'>
                        {searchPerformed && users.length === 0 && posts.length === 0 && <p>No results found</p>}
                        {users.length > 0 && (
                            users.map(user => (
                                <div key={user._id} className='card card-body card-bordered card-normal mb-2'>
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
            )}
        </div>
    );
};

export default Search;
