export interface UserData {
    persisted:any;
    email:string;
    isGoogle:boolean;
    fullname:string;
    password:string;
    mobile:string;
    profilePicture:string;
    uid:string;
    userName:string;
    bio:string;
    followers:any[];
    following:any[];
    _id:string;
    createdOn:Date;
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
    _id:string;
    name:String;
    postId: string;
    createdAt: Date;
}