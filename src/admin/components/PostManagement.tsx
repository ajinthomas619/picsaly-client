import axios from "axios";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { PostData } from "@/utils/interfaces/interface";
import { confirmAlert } from "react-confirm-alert";
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl";

const PostManagement = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);

    const columns: TableColumn<PostData>[] = [
        {
            name: "Id",
            cell: (_row: PostData, index: number) => index + 1,
        },
        {
            name: "Title",
            selector: (row: PostData) => row?.caption,
        },
        {
            name: "Author",
            selector: (row: PostData) => row.createdBy?.basicInformation.username,
        },
        {
            name: "Reports",
            selector: (row: PostData) => row?.reportedUsersList.length,
        },
        {
            name: "Actions",
            cell: (row: PostData) => (
                <div>
                    
                    {row?.Visibility ? (
                        <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-300"
                            onClick={() => handleStatusChange(row._id)}>
                            Block
                        </button>
                    ) : (
                        <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-300"
                            onClick={() => handleStatusChange(row._id)}>
                            Unblock
                        </button>
                    )}
                </div>
            ),
        }
    ];

    useEffect(() => {
        axios.get(`${BASE_URL}/showall`)
            .then((res) => {
                console.log("the response", res);
                setPosts(res.data.data);
                setReload(false)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            })
            
    }, [reload]);

    const handleStatusChange = (postId: string) => {
        confirmAlert({
            title: "Confirm to change Visibility Status",  
            message: "Are you sure to change the visibility of this post?",
            buttons: [
                {
                    label: "Change",
                    onClick: () => {
                        axios.post(`${BASE_URL}/updatepoststatus`, { postId }, { withCredentials: true })
                            .then((res) => {
                                console.log("the resp[onse of update post status",res)
                                setReload(true);
                                if (res.data.data.Visibility) {
                                    toast.success(`${res.data.data.caption} unblocked`);
                                } else {
                                    toast.success(`${res.data.data.caption} blocked`);
                                }
                            })
                            .catch((error) => {
                                toast.error("Error in changing post visibility status");
                                console.error("Error in changing post visibility status", error);
                            });
                    }
                },
                {
                    label: "Cancel"
                }
            ]
        });
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">Post Management</h1>
            <div className="w-full mt-16 px-36  justify-center">
                {loading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                ) : (
                    <DataTable
                        columns={columns}
                        data={posts}
                        pagination
                        highlightOnHover
                        
                    />
                )}
            </div>
        </div>
    );
};

export default PostManagement;
