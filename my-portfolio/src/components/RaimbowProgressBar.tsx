import ProgressBar from "@ramonak/react-progress-bar";
import chroma from "chroma-js"
import { CSSProperties, ReactNode } from "react";
import styled from "styled-components"


export interface GradientSpec {
  color: string,
  pos: number,
}
export interface GradientProgressBarProps {
  percentage: number,
  colors: GradientSpec[],
  toLeft?: ReactNode,
  toRight?: ReactNode,
  customLabelStyles?: CSSProperties,
}
export const GradientProgressBar = ({percentage, colors, toLeft, toRight, ...props}: GradientProgressBarProps) => {
  function getColorAtPercentage(percentage: number) {
    const gradient = chroma.scale(colors.map(stop => stop.color)).domain(colors.map(stop => stop.pos));
    return gradient(percentage).hex();
  }

  const color = getColorAtPercentage(percentage);

  return <>
    <ProgressBar completed={percentage} bgColor={color} {...props} />
  </>;
}

export interface RaimbowColorBarProps {
  percentage: number,
  toLeft?: ReactNode,
  toRight?: ReactNode,
}
export const RaimbowColorBar = ({percentage, toLeft, toRight, ...props}: RaimbowColorBarProps) => {
  // Define your gradient stops
  const colors: GradientSpec[] = [
    { pos: 0, color: 'red' },
    { pos: 33, color: 'yellow' },
    { pos: 66, color: 'green' },
    { pos: 100, color: '#3399ff' },
  ];

  return <>
    <div className="row">
      {toLeft}
      <GradientProgressBar percentage={percentage} colors={colors} 
        customLabelStyles={{
          textShadow: 
          "-3px -3px 3px black, -3px 3px 3px black, 3px 3px 3px black, 3px -3px 3px black"
          ,
        }}
        {...props} 
      />
      {toRight}
    </div>
  </>;
}
