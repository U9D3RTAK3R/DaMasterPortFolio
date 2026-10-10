import { createContext, useContext } from "react";

export const HeroMotionContext = createContext(null);

export const useHeroMotion = () => useContext(HeroMotionContext);