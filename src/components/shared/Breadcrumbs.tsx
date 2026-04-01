import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { RightArrowIcon } from "@root/assets/icon/RightArrowIcon";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="text-base leading-6">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbLink href={item.href || ""} className="text-red-4">
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink href={item.href || ""} className="text-gray-3 dark:text-gray-30">
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator>
                  <RightArrowIcon className="text-gray-6 dark:text-gray-29" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
