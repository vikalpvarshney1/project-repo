import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ErrorToastHandler() {
  const error = useSelector((state) => state.coins.error);
  const status = useSelector((state) => state.coins.status);

  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(`Error fetching coin data: ${error}`);
    }
  }, [status, error]);

  return null;
}
