// types/react-icons.d.ts
import { IconBaseProps } from "react-icons/lib";

declare module "react-icons/fa" {
  export interface IconBaseProps extends React.SVGAttributes<SVGSVGElement> {
    className?: string;
  }
}