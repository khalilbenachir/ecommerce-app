"use client";

import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { Copy, Server } from "lucide-react";

import { Badge, BadgeProps } from "./badge";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Button } from "./button";

interface IApiAlert {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<IApiAlert["variant"], string> = {
  admin: "Admin",
  public: "Public",
};

const variantMap: Record<IApiAlert["variant"], BadgeProps["variant"]> = {
  admin: "destructive",
  public: "secondary",
};

const ApiAlert: React.FC<IApiAlert> = ({
  description,
  title,
  variant = "public",
}) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(description);
    toast.success("text copied to clipboard with success.");
  }, [description]);

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex justify-between items-center">
        <code className="font-mono bg-muted font-semibold relative rounded px-[.2rem] py-[.3rem]">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
