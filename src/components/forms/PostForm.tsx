
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import  * as z from 'zod'
 
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

type PostFormProps = {
    post?: any; // TODO: type this properly
}

const formSchema = z.object({
caption:z.string().min(5),
file:z.custom<File[]>(),
location:z.string().min(2),
tags:z.string()

})

const PostForm = ({ post }:PostFormProps) => {

const form = useForm<z.infer<typeof formSchema>>({
resolver:zodResolver(formSchema),
defaultValues:{
caption: post?.caption || "",
file:[],
location:post?.location|| "",
tags:post?post.tags.join(','):''


}
})
function onSubmit(values: z.infer<typeof  formSchema>) {


//use axios to connect to backend
}


  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col
     gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Caption</FormLabel>
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
            mediaUrl={post?.imageUrl}
            
            />           

            </FormControl>
           
            <FormMessage className="shad-form_message"/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">AddLocation</FormLabel>
            <FormControl>
            <Input type="text" className="shad-input" {...field}/>         

            </FormControl>
           
            <FormMessage className="shad-form_message"/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Tags (seperated by comma ",")</FormLabel>
            <FormControl>
            <Input type="text" className="shad-input" placeholder="Photos,Filmy,Vibes" {...field}/>         

            </FormControl>
           
            <FormMessage className="shad-form_message"/>
          </FormItem>
        )}
      />
      <div className="flex gap-4 items-center justify-end">

      <Button type="button" className="shad-button_dark_4">Cancel</Button>
      <Button type="submit" className="shad-button_primary whitespace-nowrap">Submit</Button>


      </div>
    </form>
  </Form>
  )
}

export default PostForm
