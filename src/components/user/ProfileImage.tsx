import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { X } from "lucide-react";
import { useUploadProfileImg } from "@/hooks/profile/admin/useUpdateProfileImg";
import { useRemoveProfileImg } from "@/hooks/profile/admin/useRemoveProfileImg";
import { Spinner } from "../ui/spinner";

interface ProfileImageProps {
  profileImage?: string;
  profileImageId?: string;
}

const ProfileImage = ({ profileImage, profileImageId }: ProfileImageProps) => {
  const { mutate: uploadProfileImg, isPending } = useUploadProfileImg();
  const removeProfileImg = useRemoveProfileImg();
  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    uploadProfileImg(file);
  };

  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/png": [".png"],
    },
    maxSize: 2 * 1024 * 1024,
    multiple: false,
    onDrop,
  });

  const removeProfileImageHandler = () => {
    if (profileImageId) {
      removeProfileImg.mutateAsync(profileImageId);
    }
  };

  return (
    <main>
      {profileImageId && (
        <Button
          variant="destructive"
          className="rounded-full absolute ml-20  mt-2 z-10 cursor-pointer"
          onClick={() => {
            removeProfileImageHandler();
          }}
        >
          <X color="#fff" className="w-5 h-5" />
        </Button>
      )}
      <div className="w-32 h-32 relative mt-5" {...getRootProps({})}>
        {isPending ? (
          <Spinner className="m-auto w-full h-full mb-2" />
        ) : (
          <Avatar className="m-auto w-full h-full mb-2">
            <AvatarImage src={profileImage} className="object-cover" />

            <AvatarFallback className="text-4xl uppercase"></AvatarFallback>
          </Avatar>
        )}

        <Button className="w-fit flex mx-auto">Update Profile</Button>

        <input {...getInputProps()} />
      </div>
    </main>
  );
};

export default ProfileImage;
