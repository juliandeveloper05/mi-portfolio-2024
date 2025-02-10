export interface CoreComponentsProps {
  children?: React.ReactNode;
  classNames?: string;
  id?: string;
  elementRef?: React.RefObject<HTMLDivElement>;
  onClick?: () => void;
}
