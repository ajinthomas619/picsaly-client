import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
  handleFileChange: (files: File[]) => void;
};

const ProfileUploader = ({ fieldChange, mediaUrl, handleFileChange }: ProfileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setFileUrl(URL.createObjectURL(file));
      fieldChange(acceptedFiles);
      handleFileChange(acceptedFiles);
    },
    [fieldChange, handleFileChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="cursor-pointer flex-center gap-4">
        <img
          src={fileUrl || "https://avatar.iran.liara.run/public/boy"}
          alt="image"
          className="h-52 w-52 rounded-full object-cover object-top"
        />
      </div>
    </div>
  );
};

export default ProfileUploader;
