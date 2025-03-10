import React from "react";
import type { ThemeType } from "styles/theme";
import { SpinnerWrapper } from "./styles";

export interface SpinnerProps {
  size?: keyof ThemeType["spacing"];
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = "md", color }) => {
  return <SpinnerWrapper size={size} color={color} />;
};

export default Spinner;
