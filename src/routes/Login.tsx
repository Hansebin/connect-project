import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authCom from "./styled-components/auth-component";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import SocialLogIn from "../components/SocialLogIn";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (isLoading || email === "" || password === "") return;

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <authCom.Container>
        <h1 className="text-4xl font-bold">Log in</h1>
        <div>
          <form
            onSubmit={onSubmit}
            className="w-full h-full pb-8 flex flex-col justify-center items-start"
          >
            <label
              htmlFor="email"
              className="text-lg font-bold text-main-green"
            >
              Email
            </label>
            <authCom.Input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={onChangeInput}
              placeholder="Write email..."
              autoComplete="false"
              required
            />
            <label
              htmlFor="password"
              className="text-lg font-semibold text-main-green"
            >
              Password
            </label>
            <authCom.Input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={onChangeInput}
              placeholder="Write password..."
              autoComplete="false"
              required
            />
            <authCom.InputButton
              type="submit"
              value={isLoading ? "login..." : "Go into connect"}
            />
          </form>
          {error !== "" ? (
            <p className="w-full text-center text-sm text-red-500">{error}</p>
          ) : null}
        </div>
        <p className="text-sm">
          Don't have an account yet?{" "}
          <Link to="/create-account" className="text-main-green">
            Create an account
          </Link>
        </p>
        <SocialLogIn />
      </authCom.Container>
    </div>
  );
}

export default Login;
