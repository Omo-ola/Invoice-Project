import { useForm } from "react-hook-form";
import { Label } from "../ui/Label";
import { StyledInput } from "../ui/StyledInput";
import { Errors, Ilogin } from "../types/Interface";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getUser } from "../services/getUser";
import { useEffect } from "react";

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

  useEffect(() => {
    if (isSuccess && userToken && userToken.data && userToken.data.data) {
      const { token } = userToken.data.data;
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [isSuccess, userToken, navigate]);

  // Submit handler
  const onSubmit = (data: Ilogin) => {
    mutate(data);
  };

  // Error handler
  function onError(errors: Errors) {
    if (Object.keys(errors).length > 0) {
      const firstElement = errors[Object.keys(errors)[0]];
      toast.error(firstElement.message);
    } else {
      toast.error(errors.message);
    }
  }
  return (
    <div className=" bg-[var(--bg-color-ter)] w-full h-[100vh] pt-20  text-white">
      <form
        // @ts-ignore
        onSubmit={handleSubmit(onSubmit, onError)}
        className="bg-[var(--bg-color-primary)] shadow-2xl rounded-md p-4 max-w-[25rem] w-[90%] m-auto"
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
        <div className="flex justify-center mt-2 mb-6">
          <button
            type="submit"
            className="py-2 px-4 mt-4 font-semibold text-sm text-white bg-[#7c5df9] flex justify-center"
          >
            Login
          </button>
        </div>

        <div className="flex justify-between items-center my-2">
          <p className="text-[.67rem] text-[#b8b9b9]">
            Doesn't have an account yet ?
          </p>
          <Link to="/signUp" className="text-[#7c5df9] text-[.67rem]">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
