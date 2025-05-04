"use client";

import React, { useEffect, useState } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataNode {
    id: string;
    name: string;
    isChecked?: boolean;
    children?: DataNode[];
}

interface CheckedItem {
    moduleName: string;
    moduleId: number;
    operationId: number | null;
    operationName: string;
    isChecked: boolean;
}

interface TreeProps {
    roleData: DataNode[];
    handleSubmit: (values: CheckedItem[]) => void
}

function Tree({ roleData, handleSubmit }: TreeProps) {
    const [checkedItems, setCheckedItems] = useState<CheckedItem[]>([]);

    useEffect(() => {
        // Initialize checkedItems with the initial `isChecked` values
        const initialCheckedItems:any = roleData.flatMap((module) =>
          module.children
            ? module.children.map((operation) => ({
                moduleName: module.name,
                moduleId: parseInt(module.id, 10),
                operationId: parseInt(operation.id.split("-")[1], 10) || null,
                operationName: operation.name,
                isChecked: operation.isChecked,
              }))
            : []
        );
        setCheckedItems(initialCheckedItems);
      }, [roleData]);

    const handleCheckboxChange = (
        moduleName: string,
        id: string,
        operationName: string,
        isChecked: boolean
    ) => {
        const [moduleIdStr, operationIdStr] = id.split("-");
        const moduleId = Number(moduleIdStr);
        const operationId = operationIdStr ? Number(operationIdStr) : null;

        setCheckedItems((prevCheckedItems) => {
            // Update the item in the checkedItems array
            const updatedItems = prevCheckedItems.map((item) =>
              item.moduleId === moduleId && item.operationId === operationId
                ? { ...item, isChecked }
                : item
            );
        
            return updatedItems;
          });
    };

    const handleSave = () => {
        handleSubmit(checkedItems);
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
            <div className="mt-6">
                <TreeNode
                    data={roleData}
                    checkedItems={checkedItems}
                    onCheckboxChange={handleCheckboxChange}
                />
            </div>

            <button
                onClick={handleSave}
                className="mt-6 px-6 py-2 bg-green-600 text-white font-bold rounded shadow hover:bg-green-700 transition-all"
            >
                Save
            </button>
        </div>
    );
}

interface TreeNodeProps {
    data: DataNode[];
    checkedItems: CheckedItem[];
    onCheckboxChange: (
        moduleName: string,
        id: string,
        operationName: string,
        isChecked: boolean
    ) => void;
    parentName?: string;
}

function TreeNode({
    data,
    checkedItems,
    onCheckboxChange,
    parentName = "",
}: TreeNodeProps) {
    const isChecked = (id: string) => {
        const [moduleIdStr, operationIdStr] = id.split("-");
        const moduleId = Number(moduleIdStr);
        const operationId = operationIdStr ? Number(operationIdStr) : null;

        return checkedItems.some(
            (item) => item.moduleId === moduleId && item.operationId === operationId && item.isChecked
        );
    };

    return (
        <ul role="list" className="space-y-2">
            {data.map((item) => (
                <li key={item.id}>
                    {item.children ? (
                        <AccordionPrimitive.Root type="single" collapsible>
                            <AccordionPrimitive.Item value={`item-${item.id}`}>
                                <AccordionTrigger>{item.name}</AccordionTrigger>
                                <AccordionContent className="pl-6">
                                    <TreeNode
                                        data={item.children}
                                        checkedItems={checkedItems}
                                        onCheckboxChange={onCheckboxChange}
                                        parentName={item.name}
                                    />
                                </AccordionContent>
                            </AccordionPrimitive.Item>
                        </AccordionPrimitive.Root>
                    ) : (
                        <Leaf
                            moduleName={parentName}
                            id={item.id}
                            name={item.name}
                            checked={isChecked(item.id)}
                            onCheckboxChange={onCheckboxChange}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
}

interface LeafProps {
    moduleName: string;
    id: string;
    name: string;
    checked: boolean;
    onCheckboxChange: (
        moduleName: string,
        id: string,
        operationName: string,
        isChecked: boolean
    ) => void;
}

function Leaf({ moduleName, id, name, checked, onCheckboxChange }: LeafProps) {
    return (
        <div className="flex items-center gap-3">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onCheckboxChange(moduleName, id, name, e.target.checked)}
                className="accent-blue-600 rounded w-5 h-5 transition-all hover:scale-105 focus:ring focus:ring-blue-200"
            />
            <span className="font-medium text-gray-800">{name}</span>
        </div>
    );
}

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<"button">
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                "flex flex-1 items-center py-2 font-semibold transition-all hover:bg-gray-100 rounded-md first:[&[data-state=open]>svg]:rotate-90",
                className
            )}
            {...props}
        >
            <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-300" />
            <span className="ml-2">{children}</span>
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className={cn(
            "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
            className
        )}
        {...props}
    >
        <div className="pl-4">{children}</div>
    </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export default Tree;
