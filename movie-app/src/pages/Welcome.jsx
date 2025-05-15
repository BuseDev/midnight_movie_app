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
        Discover trending, hidden gems, and all-time favorites — tailored just for you. Your next movie night starts here.
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
