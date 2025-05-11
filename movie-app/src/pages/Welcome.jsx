import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="welcome-background">
      <img className="logo-welcome" src="/logo.png" alt="midnight" />
      <p className="welcome-txt">
        Find <span className="text-gradient">Movies</span> You'll Enjoy <br />{" "}
        Without the Hassle
      </p>
      <div className="welcome-underline"></div>

      <p className="welcome-desc">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>

      <button className="welcome-button" onClick={() => navigate("/Home")}>
        Let’s Start
      </button>
    </div>
  );
}

export default Welcome;

//src='/logo.png'
//burada "/" işareti kullanarak src yolunu mutlak yaptık
//bu sayede logo.ng üzerinde css özelliklerini değiştirebiliriz
