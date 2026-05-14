import React from "react";
import RightArrowIcon from "@assets/icon/RightArrowIcon.svg?react";
import UserIcon from "@assets/icon/UserIcon.svg?react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { displayBreadcrumbLabel } from "./utils";
import type { BreadcrumbsProps } from "./types";

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="text-base leading-6">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={item.label}>
              <BreadcrumbItem>
                {item.isProfile ? (
                  <BreadcrumbLink
                    href={item.href || ""}
                    className="text-red flex items-center gap-2"
                  >
                    <UserIcon className="size-4 shrink-0" />
                    {displayBreadcrumbLabel(item.label)}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink href={item.href || ""} className="text-gray-3 dark:text-gray-5">
                    {displayBreadcrumbLabel(item.label)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator className="inline-flex items-center justify-center leading-none text-gray-5 [&>svg]:h-[10px] [&>svg]:w-[7px]">
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
