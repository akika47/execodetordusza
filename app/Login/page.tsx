import React from "react";
import Header from "../components/Header";

const Login = () => {
  return (
    <>
      <Header />
      <form>
        <label htmlFor="">Felhasználónév</label>
        <input type="text"></input>
      </form>
    </>
  );
};

export default Login;
