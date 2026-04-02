import React from "react";
import { Tabs as TabsRoot, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs";

interface Tab {
  value: string;
  label: string;
}

interface PageTabsProps {
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
              className="h-12 w-[150px] shrink-0 rounded-none border-b-2 border-transparent px-0 py-0 text-sm font-medium uppercase text-gray-14 group-data-[variant=line]/tabs-list:data-active:border-b-red-4 data-active:bg-transparent data-active:font-semibold data-active:text-red-4 dark:text-white-3 dark:hover:text-gray-26 dark:group-data-[variant=line]/tabs-list:data-active:border-b-2 dark:group-data-[variant=line]/tabs-list:data-active:border-b-red-4 dark:data-active:text-red-4"
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
