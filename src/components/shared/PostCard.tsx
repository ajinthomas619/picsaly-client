import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserFunction } from '@/utils/api/methods/UserService/post';
import { UserData } from '@/utils/interfaces/interface';
import { useSelector } from 'react-redux';

import PostStats from './PostStats';

type PostCardProps = {
    post: any;
};

const PostCard = ({ post }: PostCardProps) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const user = useSelector((state: any) => state.persisted.user.userData);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUserFunction(post?.createdBy?._id);
                setUserData(response.data.data);
            } catch (error) {
                console.error("Error while fetching user data", error);
            }
        };
        if (user?._id) {
            fetchUserData();
        }
    }, [user]);

    const formattedDate = post?.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : '';

    return (
        <div className="post-card flex flex-col px-52 py-12">
            {user && (
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Link to={`/profile/${user._id}`}>
                            <img
                                src={userData ? `http://localhost:3001/img/${user.profilePicture}` : 'public/assets/icons/profile-placeholder.svg'}
                                alt="user"
                                className='rounded-full w-12 lg:h-12'
                            />
                        </Link>
                        <div className='flex flex-col'>
                            <p className='base-medium lg:body-bold text-light-1'>{post.createdBy.name}</p>
                            <div className='flex-center gap-2 text-light-3'>
                                <p className='subtle-semibold lg:small-regular'>{formattedDate}</p>
                                <p className='subtle-semibold lg:small-regular'>{post.location}</p>
                            </div>
                        </div>
                    </div>
                    <Link to={`/update-post/${post._id}`}>
                        <img src="/public/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                    </Link>
                </div>
            )}
            <div className='w-4/5 h-4/5'>
                <Link to={`/post/${post._id}`}>
                    <div className='small-medium lg:base-medium py-5'>
                        <p>{post.caption}</p>
                        <ul className='flex gap-1 mt-2'>
                            {post.Tags.map((tag: string) => (
                                <li key={tag} className='text-light-3'>#{tag}</li>
                            ))}
                        </ul>
                    </div>
                    <img
                        width={700}
                        src={`http://localhost:3002/img/${post?.image[0] || 'public/assets/icons/profile-placeholder.svg'}`}
                        className='post-card_img rounded-lg'
                        alt="post image"
                    />
                </Link>
                <PostStats post={post} userId={user?._id}/>
            </div>
        </div>
    );
};

export default PostCard;
