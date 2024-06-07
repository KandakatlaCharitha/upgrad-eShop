import React from "react";
import "./HomePage.css";
import homeBg from "../../assets/home-bg.jpg"; // Import the background image

function HomePage() {
  return (
    <div className="homepage" style={{ backgroundImage: `url(${homeBg})` }}>
      <div className="content">
        <h2>Welcome to e-Shop!</h2>
        <p>Sign up or log in to start shopping with us.</p>
      </div>
    </div>
  );
}

export default HomePage;
