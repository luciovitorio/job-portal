import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.success(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label className="font-semibold">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>
          <div className="mt-5">
            <RadioGroup
              className="flex items-center gap-4"
              onValueChange={(value) => setInput({ ...input, role: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="student" value="student" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="recruiter" value="recruiter" />
                <Label htmlFor="r2">Recruit</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full my-5">
            Login
          </Button>
          <div className="text-center">
            <span className="text-sm">
              Dont have an account?{" "}
              <Link to={"/register"} className="text-blue-600 font-semibold">
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
