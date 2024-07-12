
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import  * as z from 'zod'
import axios from 'axios'

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {  useSelector } from "react-redux";

 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl";


const formSchema = z.object({
username:z.string().min(5),
fullname:z.string(),
file:z.custom<File[]>(),
bio:z.string(),
phone:z.string().min(10),
dob:z.date()

})



const UserForm = () => {
  const user = useSelector( (state : any) => state.user )

const form = useForm<z.infer<typeof formSchema>>({
resolver:zodResolver(formSchema),
defaultValues:{
username: user?.username|| "",
file:user?.profilePicture||"",
fullname:user?.fullname|| "",
phone:user?.phone||"",
dob:user?.dob? new Date(user.dob) : undefined,
bio:user?.bio||""


}
})
async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    console.log(values);
    const formData = useSelector((state: any) => state.persisted.user.userData);

    // Append each field to the FormData object
    formData.append('username', values.username);
    formData.append('file', values.file[0]); // Assuming you're uploading a single file
    formData.append('fullname', values.fullname);
    formData.append('phone', values.phone);
    formData.append('dob', values.dob ? values.dob.toISOString().split('T')[0] : ''); // Format date as string

    formData.append('bio', values.bio);
    formData.append("profileUrl",values.file    )
    
    // const formData = new FormData();
    // formData.append('caption', values.caption);
    // formData.append('file', values.file);

  
    const response = await axios.post(
      `${BASE_URL}/editProfile/{$id}`,
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    console.log("Response:", response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col
     gap-9 w-full max-w-5xl mx-auto">
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label ">Bio</FormLabel>
            <FormControl>
              <Textarea  className="shad-textarea custom-scrollbar" placeholder="shadcn" {...field} />
            </FormControl>
           
            <FormMessage className="shad-form_message"/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Photo</FormLabel>
            <FormControl>
            <FileUploader
            fieldChange={field.onChange}
            mediaUrl={user?.imageUrl}
            
            />           

            </FormControl>
           
            <FormMessage className="shad-form_message"/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">username</FormLabel>
            <FormControl>
            <Input type="text" className="shad-input" {...field}/>         

            </FormControl>
           
            <FormMessage className="shad-form_message"/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">phone</FormLabel>
            <FormControl>
            <Input type="text" className="shad-input" {...field}/>         

            </FormControl>
           
            <FormMessage className="shad-form_message"/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fullname"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">fullname</FormLabel>
            <FormControl>
            <Input type="text" className="shad-input"  {...field}/>         

            </FormControl>
           
            <FormMessage className="shad-form_message"/>
          </FormItem>
        )}
      />
      <FormField
  control={form.control}
  name="dob"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="shad-form_label">Date of Birth</FormLabel>
      <FormControl>
        <ReactDatePicker
          className="shad-input" // You can customize the styling here
          dateFormat="MM/dd/yyyy" // Date format
          selected={field.value ? new Date(field.value) : null}
          onChange={(date:any) => {
            // Convert the date to a string and set the field value
            field.onChange(date ? date.toISOString().split('T')[0] : '');
          }}
        />
      </FormControl>
      <FormMessage className="shad-form_message" />
    </FormItem>
  )}
/>

      <div className="flex gap-4 items-center justify-end">

      <Button type="button" className="shad-button_dark_4">Cancel</Button>
      <Button type="submit" className="shad-button_primary whitespace-nowrap">Update</Button>


      </div>
    </form>
  </Form>
  )
}

export default UserForm
