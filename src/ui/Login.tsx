import { useForm } from "react-hook-form";
import { Label } from "./Label";
import { StyledInput } from "./StyledInput";
import { Errors, Ilogin } from "../types/Interface";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getUser } from "../services/getUser";

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const {
    mutate,
    isSuccess,
    data: userToken,
  } = useMutation({
    mutationFn: getUser,
    onSuccess: () => {
      toast.success("User login successfully");
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (isSuccess) {
    const { token, isAdminToken } = userToken.data.data;
    if (isAdminToken) {
    localStorage.setItem("adminToken", `${isAdminToken}`);
      
    }
      localStorage.setItem("token", token);
    navigate("/", { replace: true });
  }

  // Submit handler
  const onSubmit = (data: Ilogin) => {
    mutate(data);
    reset();
  };

  // Error handler
  function onError(errors: Errors) {
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      const firstElement = errors[Object.keys(errors)[0]];
      toast.error(firstElement.message);
    } else {
      toast.error(errors.message);
    }
  }
  return (
    <div className=" bg-[#1d2238] w-full h-[100vh] pt-20  text-white">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="  bg-[#131426] rounded-md p-4 max-w-[25rem] w-[90%] m-auto"
      >
        <p className="font-bold text-2xl text-center mb-4">Login</p>
        <div className="mb-4">
          <Label>Email</Label>
          <StyledInput
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
          />
        </div>
        <div>
          <Label>Password</Label>
          <StyledInput
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="p-2 mt-4 font-semibold text-lg rounded-md text-white bg-[#7c5df9] flex justify-center"
          >
            Login
          </button>
        </div>

        <div className="flex justify-between items-center my-2">
          <p className="text-sm text-[#b8b9b9]">
            Doesn't have an account yet ?
          </p>
          <Link to="/signUp" className="text-[#7c5df9]">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
