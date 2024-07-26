import EditProfile from "@/components/forms/EditProfile";
import ProfileUploader from "@/components/shared/profileUplloader";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateUser, getUser } from "@/redux/slices/userSlices";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl";

const formSchema = z.object({
  image: z.string().optional(),
});

const UpdateProfile = () => {
  const [user, setUser] = useState({});
  const userData = useSelector((state: any) => state.persisted.user.userData);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      image: userData?.profile?.profileUrl ? `${import.meta.env.VITE_APP_BASE_URL}/profile/${userData.profile.profileUrl}` : "",
    },
  });

  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = userData.finduser._id
const navigate = useNavigate()

  // useEffect(() => {
  //   if (userId) {
  //     navigate("/update-profile");
  //   } else {
  //     navigate("/log-in");
  //   }
  // }, []);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/getUserById/${id}`,
          { withCredentials: true }
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error in finding user", error);
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (userData?.profile?.profileUrl) {
      form.setValue("image", `${import.meta.env.VITE_APP_BASE_URL}/profile/${userData.profile.profileUrl}`);
    }
  }, [userData, form]);

  const handleFileChange = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await axios.post(
        `${BASE_URL}/addProfileImage/${user._id}`,
        formData,
        { withCredentials: true }
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const imageUrl = response.data.imageUrl;
      dispatch(updateUser({ ...userData, profile: { ...userData.profile, profileUrl: imageUrl } }));
      form.setValue("image", `${import.meta.env.VITE_APP_BASE_URL}/profile/${imageUrl}`);

    } catch (error) {
      console.error("Failed to update profile image:", error);
    }
  };

  return (
    <div className="flex flex-1 ml-48 mt-24">
      <div className="common-container w-full items-center">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full items-center">
          <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()}>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form-label">Profile Image</FormLabel>
                    <FormControl>
                      <ProfileUploader
                        fieldChange={field.onChange}
                        mediaUrl={field.value}
                        handleFileChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <EditProfile />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
