"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";

interface IImageUpload {
  disabled?: boolean;
  value: string[];
  onRemove: (url: string) => void;
  onChange: (url: string) => void;
}

const ImageUpload: React.FC<IImageUpload> = ({
  onChange,
  onRemove,
  value,
  disabled,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onUplaod = (result: any) => {
    onChange(result?.info?.secure_url);
  };

  if (!mounted) return null;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[200px] w-[200px] rounded-md overflow-hidden"
          >
            <div className="z-20 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
                disabled={disabled}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image alt="image" src={url} className="object-cover" fill />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="cutrr8fh" onUpload={onUplaod}>
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button onClick={onClick} disabled={disabled} variant="secondary">
              <ImagePlus className="mr-2 h-4 w-4" />
              upload image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
