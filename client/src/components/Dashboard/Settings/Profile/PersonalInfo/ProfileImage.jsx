import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const ProfileImage = ({ register }) => {
  const hiddenInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const { ref: registerRef, ...rest } = register("profilePicture");

  const handleUploadedFile = (event) => {
    const file = event.target.files[0];
    const urlImage = URL.createObjectURL(file);
    setPreview(urlImage);
  };

  const onUpload = () => {
    hiddenInputRef.current.click();
  };

  const uploadButtonLabel = preview ? "Change image" : "Upload image";

  return (
    <div>
      <Label>Profile picture</Label>

      <Input
        type="file"
        name="profilePicture"
        {...rest}
        onChange={handleUploadedFile}
        ref={(e) => {
          registerRef(e);
          hiddenInputRef.current = e;
        }}
      />

      <Avatar src={preview} sx={{ width: 80, height: 80 }} />

      <Button variant="text" onClick={onUpload}>
        {uploadButtonLabel}
      </Button>
    </div>
  );
};

export default ProfileImage;
