import { useQuery } from "@tanstack/react-query";
import { getUserInvoice } from "../services/getInvoice";
import Spinner from "./Spinner";

function UserProfile() {
  const { isLoading, data } = useQuery({
    queryKey: ["userInvoice"],
    queryFn: getUserInvoice,
  });

  if (isLoading) return <Spinner />;
  console.log(data);

  return <div>UserProfile</div>;
}

export default UserProfile;
