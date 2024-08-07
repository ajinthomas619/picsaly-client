import { AxiosError } from "axios";

export interface UserData {
    persisted:any;
    email:string;
    isGoogle:boolean;
    fullname:string;
    password:string;
    mobile:string;
    profilePicture:any;
    userId:string;
    userName:string;
    bio:string;
    followers:any[];
    following:any[];
    _id:any;
    createdOn:Date;
    finduser:any
   
}


export interface PostData {
    caption:string;
    _id:string;
    image:any[];
    location:string;
    createdBy:string;
    like:any[];
    comment:any[];
    tags:any[];
    createdOn:Date;
}

export interface CommentData {
    text:string;
    _id:any;
    name:String;
    postId: string;
    createdAt: Date;
    userId:string;
    username:any;
    replies:any;
    likes:any
}
export interface Message {
    shouldShake:boolean;
    _id:string;
    senderId:string;
    reciverId:string;
    message:string;
    imgURL:string;
    createdAt:Date;
    updatedAt:Date;
}

export interface Conversation {
    name:string;
    error?:AxiosError;
    profilePicture:string;
    conversations:[Conversation]
    _id:string;
    participants:[UserData];
    messages:[Message];
    createdAt:Date;
    updatedAt:Date;
}