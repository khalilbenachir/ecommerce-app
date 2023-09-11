import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const useStore = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const onDelete = useCallback(async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store deleted.");
    } catch (error) {
      toast.error("Something went wrong ...");
    } finally {
      setLoading(false);
    }
  }, [setLoading, params?.storeId, router]);

  const onUpdate = useCallback(
    async (data: { name: string }) => {
      try {
        setLoading(true);
        await axios.patch(`/api/stores/${params.storeId}`, data);
        router.refresh();
        toast.success("Store deleted.");
      } catch (error) {
        toast.error("Something went wrong ...");
      } finally {
        setLoading(false);
      }
    },
    [setLoading, params?.storeId, router]
  );

  return { onDelete, onUpdate, loading, id: params.storeId };
};

export default useStore;
