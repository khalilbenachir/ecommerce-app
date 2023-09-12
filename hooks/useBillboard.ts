import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const useBillboard = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const onDelete = useCallback(async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/billboard/${params.billboardId}`
      );
      router.refresh();
      router.push("/");
      toast.success("Billboard deleted.");
    } catch (error) {
      toast.error("Something went wrong ...");
    } finally {
      setLoading(false);
    }
  }, [setLoading, params?.storeId, router, params.billboardId]);

  const onUpdate = useCallback(
    async (data: { label: string; imageUrl: string }) => {
      try {
        setLoading(true);
        await axios.patch(
          `/api/${params.storeId}/billboard/${params.billboardId}`,
          data
        );
        router.refresh();
        toast.success("Billboard deleted.");
      } catch (error) {
        toast.error("Something went wrong ...");
      } finally {
        setLoading(false);
      }
    },
    [setLoading, params?.storeId, router, params.billboardId]
  );

  const onCreate = useCallback(
    async (data: { label: string; imageUrl: string }) => {
      try {
        setLoading(true);
        await axios.post(`/api/${params.storeId}/billboard`, data);
        router.refresh();
        toast.success("Billboard created.");
      } catch (error) {
        toast.error("Something went wrong ...");
      } finally {
        setLoading(false);
      }
    },
    [setLoading, params?.storeId, router]
  );

  return { onDelete, onUpdate, loading, id: params.billboardId, onCreate };
};

export default useBillboard;
