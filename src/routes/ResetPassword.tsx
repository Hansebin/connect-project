import React, { useState } from "react";
import * as authCom from "../assets/auth-component";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = auth.currentUser;
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onClickBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user || isLoading || email === "") return;

    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      alert("A password reset email has been sent to the email you entered.");
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center text-main-black">
      <authCom.Container className="items-center">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <h3 className="text-center text-gray-500">
          A password reset email will be sent to the email you entered below.
        </h3>
        <form
          onClick={onClickBtn}
          className="w-full flex flex-col justify-center"
        >
          <authCom.Input
            type="email"
            value={email}
            onChange={onChange}
            placeholder="Write email..."
          />
          <authCom.InputButton
            type="submit"
            value={isLoading ? "Sending..." : "Send Email"}
          />
        </form>
      </authCom.Container>
    </div>
  );
}

export default ResetPassword;
