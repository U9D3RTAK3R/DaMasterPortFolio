import { useEffect, useState } from "react";
import CloudSVG from "/cloud.svg";
import BirdSVG from "/bird2.svg";
import RaysSVG from "/sun.svg";

export const CloudBackground = () => {
  const [clouds, setClouds] = useState([]);
  const [birds, setBirds] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setIsDarkMode(document.documentElement.classList.contains("dark"));
    generateClouds();
    generateBirds();

    return () => observer.disconnect();
  }, []);

  const generateClouds = () => {
    const numberOfClouds = 12;
    const newClouds = [];

    for (let i = 0; i < numberOfClouds; i++) {
      newClouds.push({
        id: i,
        size: Math.random() * 50 + 80,
        x: Math.random() * 100,
        y: Math.random() * 80,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 3,
        opacity: Math.random() * 0.3 + 0.6,
        direction: Math.random() < 0.5 ? -1 : 1,
      });
    }
    setClouds(newClouds);
  };

  const generateBirds = () => {
    const numberOfBirds = 5;
    const newBirds = [];

    for (let i = 0; i < numberOfBirds; i++) {
      newBirds.push({
        id: i,
        size: Math.random() * 20 + 20,
        top: Math.random() * 70,
        delay: Math.random() * 10,
        duration: Math.random() * 10 + 10,
      });
    }
    setBirds(newBirds);
  };

  if (isDarkMode) return null;

  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      <img
        src={RaysSVG}
        className="absolute left-1/2 top-[-100px] -translate-x-1/2 z-[-1] animate-slow-spin"
        style={{ width: "600px", opacity: 0.1 }}
        alt="Sun Rays"
      />

      {clouds.map((cloud) => (
        <img
          key={cloud.id}
          src={CloudSVG}
          className="cloud-floating wind-effect"
          style={{
            width: cloud.size + "px",
            left: cloud.x + "%",
            top: cloud.y + "%",
            animationDuration: cloud.duration + "s",
            animationDelay: cloud.delay + "s",
            opacity: cloud.opacity,
            animationDirection: cloud.direction === 1 ? "normal" : "reverse",
          }}
        />
      ))}

      {birds.map((bird) => (
        <img
          key={bird.id}
          src={BirdSVG}
          className="bird-fly"
          style={{
            width: bird.size + "px",
            top: bird.top + "%",
            animationDelay: bird.delay + "s",
            animationDuration: bird.duration + "s",
          }}
        />
      ))}
    </div>
  );
};
