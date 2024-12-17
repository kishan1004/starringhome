import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const UserProtectLayout = (props) => {
  const navigate = useNavigate();


  if (!localStorage.getItem("userToken")) {
    navigate("/user-login");
    return;
  }
  return <>{props.children}</>;
};

export default UserProtectLayout;
