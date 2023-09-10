"use client";

import { useEffect } from "react";

import useStoreModal from "@/hooks/useStoreModal";

export default function Home() {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [onOpen, isOpen]);

  return null;
}
