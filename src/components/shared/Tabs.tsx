import React from "react";
import { Tabs as TabsRoot, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs";

export interface Tab {
  value: string;
  label: string;
}

export interface PageTabsProps {
  tabs: Tab[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
}

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
        className="flex flex-col w-full h-full"
      >
        <TabsList
          variant="line"
          className="h-12 w-full justify-start gap-0 bg-transparent px-0 shrink-0"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="h-12 w-[150px] shrink-0 rounded-none border-b-2 border-transparent px-0 text-sm font-medium uppercase text-gray-14 hover:text-gray-14 data-active:border-red-4 data-active:bg-transparent data-active:text-red-4 dark:text-gray-26 dark:hover:text-gray-26 dark:data-active:border-red-4 dark:data-active:text-red-4"
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
