"use client";

import { useDropzone } from "react-dropzone";
import { UploadIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";

interface ProductImageProps {
  onChange: (file?: File) => void;
  selectedFile: File | string;
}

export function ProductImage({ onChange, selectedFile }: ProductImageProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/png": [".png"],
    },
    maxSize: 2 * 1024 * 1024,
    multiple: false,
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0] ?? null;
      onChange(selectedFile);
    },
  });

  const removeFile = () => {
    onChange(undefined);
  };

  console.log(selectedFile);

  const image = selectedFile
    ? typeof selectedFile === "string"
      ? selectedFile
      : URL.createObjectURL(selectedFile)
    : null;

  // [https]://[res.cloudinary.com]/d[tqutppbf]/[image]/upload/v1769178153/e_commerce_app/product-images/[tmp-4-1769178151484_pej1dv.jpg]

  const name = selectedFile
    ? typeof selectedFile === "string"
      ? (selectedFile as string).split("/").at(-1)
      : selectedFile.name
    : null;

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100",
        )}
      >
        <input {...getInputProps()} />
        <UploadIcon className="w-10 h-10 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500">
          {isDragActive
            ? "Drop the image here..."
            : "Drag & drop an image here, or click to select"}
        </p>
      </div>

      {selectedFile && (
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center space-x-3">
            <span className="rounded-sm w-10 h-10">
              {image && (
                <Avatar>
                  <AvatarImage src={image} />
                </Avatar>
              )}
            </span>
            <span className="text-sm font-medium truncate">{name}</span>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="p-1 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
