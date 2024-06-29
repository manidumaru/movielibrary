import { grid } from "ldrs";

grid.register();

type LoaderProp = {
    size: Number,
    color: string
}

export default function Loader({size, color}: LoaderProp) {
  return <l-grid size={`${size}`} speed="2" color={color} ></l-grid>;
}
