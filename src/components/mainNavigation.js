import React, { useEffect, useState } from "react";
import axios from "axios";
import icon from "./icons/noun_Brain_869937.svg";
import Avatar from "./util/avatar";

import "./mainNavigation.css";

export default function MainNavigation() {
  const [profileUrl, setProfileUrl] = useState();

  useEffect(() => {
    const profileImage = async () => {
      let randNo = Math.ceil(Math.random() * 999);

      try {
        let responseData = await axios(
          `https://picsum.photos/id/${randNo}/info`
        );
        console.log(responseData.data);
        setProfileUrl(responseData.data.download_url);
      } catch (err) {
        console.log(err);
      }
    };
    profileImage();
  }, []);

  return (
    <div className="nav-bar">
      <div className="nav-content display-flex">
        <div className="display-flex nav-brand">
          <img className="nav-logo" src={icon} alt="" />
          <h2 className="brand-name">TasksBoard</h2>
        </div>
        <Avatar className="profile-pic" src={`${profileUrl}`} />
      </div>
    </div>
  );
}
