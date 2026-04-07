import React from "react";
import RightArrowIcon from "@assets/icon/RightArrowIcon.svg?react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import type { BreadcrumbsProps } from "./types";

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="text-base leading-6">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={item.label}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbLink
                    href={item.href || ""}
                    className="text-red-4 opacity-60 dark:text-red-4"
                  >
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink href={item.href || ""} className="text-gray-9 dark:text-gray-30">
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator className="inline-flex items-center justify-center leading-none text-gray-6 dark:text-gray-29 [&>svg]:h-[10px] [&>svg]:w-[7px]">
                  <RightArrowIcon className="block shrink-0" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
