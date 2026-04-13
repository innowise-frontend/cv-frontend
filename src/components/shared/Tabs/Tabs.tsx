import React from "react";
import { Tabs as TabsRoot, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs";
import type { PageTabsProps } from "./types";

export const PageTabs: React.FC<PageTabsProps> = ({
  tabs,
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  centered = false,
}) => {
  return (
    <div className={`w-full flex flex-col h-full ${className || ""}`}>
      <TabsRoot
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        orientation="horizontal"
        className="flex flex-col justify-start w-full h-full gap-0"
      >
        <TabsList
          variant="line"
          className={`h-12 gap-0 bg-transparent px-0 shrink-0 ${centered && "mx-auto"}`}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="w-[150px] h-12 shrink-0 rounded-none border-b-2 px-0 py-0 text-sm font-medium uppercase cursor-pointer group-data-[variant=line]/tabs-list:data-active:border-b-red! data-active:bg-transparent data-active:font-semibold data-active:text-red"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className={"flex-1 w-full"}>{children}</div>
      </TabsRoot>
    </div>
  );
};

export { TabsContent };
