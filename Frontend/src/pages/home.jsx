import { useState, useEffect } from "react";
import "./CSS/home.css";

const Home = () => {
  const [greet, setGreet] = useState("");
  const text = "Hello! Welcome to My Website!";

  useEffect(() => {
    let i = 0;
    const textTypingEffect = () => {
      if (i < text.length) {
        setGreet((prev) => prev + text[i]);
        i++;
        setTimeout(textTypingEffect, 50);
      }
    };

    textTypingEffect();

    return () => {
      i = text.length;
    };
  }, [text]);

  return (
    <div className="greeting">
      <h1 className="heading">{greet}</h1>
      <a href="/about" className="home-link">
        <button className="home-btn">{"Let's Get Started >"}</button>
      </a>
    </div>
  );
};

export default Home;
