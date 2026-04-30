export interface BreadcrumbItem {
  label: string;
  href?: string;
  isProfile?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}
