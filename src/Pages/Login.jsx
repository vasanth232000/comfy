import React from "react";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { FormInput, SubmitBtn } from "../Components";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { loginUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
export const action =
  (store) =>
  async ({ request }) => {
    const formdata = await request.formData();
    const data = Object.fromEntries(formdata);
    try {
      const response = await customFetch.post("/auth/local", data);
      store.dispatch(loginUser(response.data));
      toast.success("Login successfully");
      return redirect("/");
    } catch (error) {
      const errorMessage =
        error.response.data?.error?.message ||
        "please double check your credentials";
      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const demoUser = async () => {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data));
      toast.success("Welcome Guest");
      navigate("/");
    } catch (error) {
      error.response.data?.error?.message ||
        "please double check your credentials";
      toast.error(errorMessage);
    }
  };
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="Post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          label="email"
          name="identifier"
          defaultValue="test@test.com"
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={demoUser}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
