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
}) => {
  return (
    <div className={`w-full flex flex-col h-full ${className || ""}`}>
      <TabsRoot
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        orientation="horizontal"
        className="flex flex-col w-full h-full gap-0"
      >
        <TabsList
          variant="line"
          className="h-12 w-full justify-start gap-0 bg-transparent px-0 shrink-0"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="h-12 w-[150px] shrink-0 rounded-none border-b-2 border-transparent px-0 py-0 text-sm font-medium uppercase group-data-[variant=line]/tabs-list:data-active:border-b-red data-active:bg-transparent data-active:font-semibold data-active:text-red"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="w-full flex-1">{children}</div>
      </TabsRoot>
    </div>
  );
};

export { TabsContent };
