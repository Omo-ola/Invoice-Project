import { Link, useNavigate } from "react-router-dom";
import { StyledInput } from "../ui/StyledInput";
import { Label } from "../ui/Label";
import { useForm } from "react-hook-form";
import { Errors, IsignUp } from "../types/Interface";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../services/getUser";

function SignUp() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("User account created successfully");
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // Submit handler
  const onSubmit = (data: IsignUp) => {
    // Reset The form after collecting the data
    mutate(data);
    navigate("/login", { replace: true });
    reset();
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
        onSubmit={handleSubmit(onSubmit, onError)}
        className="  bg-[var(--bg-color-primary)] rounded-md p-4 max-w-[25rem] w-[90%] shadow-2xl m-auto"
      >
        <p className="font-bold text-2xl text-center mb-4">Login</p>
        <div className="mb-4">
          <Label>First Name</Label>
          <StyledInput
            type="text"
            {...register("firstName", {
              required: "First Name is required",
            })}
          />
        </div>
        <div className="mb-4">
          <Label>Last Name</Label>
          <StyledInput
            type="text"
            {...register("lastName", {
              required: "Last name is required",
            })}
          />
        </div>
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
            Sign Up
          </button>
        </div>

        <div className="flex justify-between items-center my-2">
          <p className="text-sm text-[#b8b9b9]">Already have an account</p>
          <Link to="/Login" className="text-[#7c5df9]">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
