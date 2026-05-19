export interface LinkButtonProps {
  title: string;
  to: string;
  icon: React.ElementType;
  collapsed?: boolean;
  matchActive?: (pathname: string) => boolean;
}
