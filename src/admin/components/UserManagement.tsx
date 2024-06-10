import axios from "axios";
import React, { useState, useEffect } from "react";
import Datatable, { TableColumn } from 'react-data-table-component';
import toast from "react-hot-toast";
import { UserData } from "@/utils/interfaces/interface";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const UserManagement: React.FC = () => {
    const [data, setData] = useState<UserData[]>([]);
    const [reload, setReload] = useState<boolean>(false);

    const columns: TableColumn<UserData>[] = [
        {
            name: "No",
            cell: (_row: UserData, index: number) => index + 1
        },
        {
            name: "Name",
            selector: (row: UserData) => row.basicInformation.username
        },
        {
            name: "Email",
            selector: (row: UserData) => row.basicInformation.email
        },
        {
            name: "Actions",
            cell: (row: UserData) => (
                <div>
                    {row.basicInformation.isBlocked === false ? (
                        <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-300"
                            onClick={() => handleStatusChange(row._id,true)}>
                            Block
                        </button>
                    ) : (
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-300"
                            onClick={() => handleStatusChange(row._id,false)}>
                            Unblock
                        </button>
                    )}
                </div>
            )
        },
    ];

    useEffect(() => {
        axios.get(`http://localhost:3000/api/getAllUsers`, { withCredentials: true })
            .then((res) => {
                setData(res.data.data);
                console.log("the data of users",res.data);
                setReload(false);
            })
            .catch((error) => {
                console.error("Error in fetching users", error);
            });
    }, [reload]);

    const handleStatusChange = (userId: string) => {
        confirmAlert({
            title: "Confirm to Change Status",
            message: "Are you sure to change the status of this user?",
            buttons: [
                {
                    label: "Change",
                    onClick: () => {
                                                                    
                        axios.post(`http://localhost:3000/api/changeuserstatus`, { userId }, { withCredentials: true })
                            .then((res) => {
                                console.log("the response of blockkk",res)
                                setReload(true);
                                if (res.data.data.basicInformation.isBlocked) {
                                    toast.success(`${res.data.user.name} blocked`);
                                } else {
                                    toast.success(`${res.data.user.name} unblocked`);
                                }
                            })
                            .catch((error) => {
                                
                                console.error("Error in changing user status", error);
                            });
                    }
                },
                {
                    label: "Cancel",
                }
            ]
        });
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">User Management</h1>
            <div className="w-full mt-16 px-36  justify-center">
                <Datatable columns={columns} data={data} pagination highlightOnHover />
            </div>
        </div>
    );
};

export default UserManagement;
