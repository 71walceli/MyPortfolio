import ProgressBar from "@ramonak/react-progress-bar";
import chroma from "chroma-js"


export interface GradientSpec {
  color: string,
  pos: number,
}
export interface GradientProgressBarProps {
  percentage: number,
  colors: GradientSpec[],
}
export const GradientProgressBar = ({percentage, colors, ...props}: GradientProgressBarProps) => {
  // Function to get the color at a specific percentage
  function getColorAtPercentage(percentage: number) {
    const gradient = chroma.scale(colors.map(stop => stop.color)).domain(colors.map(stop => stop.pos));
    return gradient(percentage).hex();
  }

  // Example usage
  const color = getColorAtPercentage(percentage);
  //console.log(color); // Should output the hex color for 25%

  return <>
    <ProgressBar completed={percentage} bgColor={color} {...props} />
  </>;
}

export interface RaimbowColorBarProps {
  percentage: number,
}
export const RaimbowColorBar = ({percentage, ...props}: RaimbowColorBarProps) => {
  // Define your gradient stops
  const colors: GradientSpec[] = [
    { pos: 0, color: 'red' },
    { pos: 33, color: 'yellow' },
    { pos: 66, color: 'green' },
    { pos: 100, color: '#3399ff' },
  ];

  return <>
    <GradientProgressBar percentage={percentage} colors={colors} {...props} />
  </>;
}
