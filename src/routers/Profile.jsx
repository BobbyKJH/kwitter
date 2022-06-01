import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../myBase";

function Profile() {
  const Navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    // 로그아웃뒤 홈으로 돌아간다.
    Navigate("/");
  };

  return (
    <div>
      <button onClick={onLogOutClick}>Log Out </button>
    </div>
  );
}

export default Profile;
