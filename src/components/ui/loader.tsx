import { bouncy } from "ldrs";

bouncy.register();

type LoaderProp = {
    size: Number,
    color: string
}

export default function Loader({size, color}: LoaderProp) {
  return <l-bouncy size={`${size}`} speed="2" color={color} ></l-bouncy>;
}
