import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChildrenProps } from "../types/Interface";

function ProtectedRoute({ children }: ChildrenProps) {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token");
  useEffect(
    function () {
      if (!isAuth) navigate("/login");
    },
    [isAuth, navigate]
  );
  return children;
}

export default ProtectedRoute;
