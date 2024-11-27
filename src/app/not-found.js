"use client";

import Button from "../components/Button";

const style = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "var(--secondary-color)",
  flexDirection : 'column'
};

const NotFound = () => {
  return (
    <div className="notfound__wrapp" style={style}>
      <h1 className="text-primary text-center not__found">
        The Page You Are Looking for Was Not
      </h1>
      <Button text={"Back To Home"} isLight={true} route={"/"} />
    </div>
  );
};

export default NotFound;
