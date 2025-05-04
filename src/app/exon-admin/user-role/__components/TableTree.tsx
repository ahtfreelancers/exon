"use client";

import { DataTable } from "@/components/root/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { columns } from "./columns";

interface DataNode {
    id: string;
    permissionId: number;
    moduleId: number
    operationId: number
    moduleName: string;
    operationName: string;
    isChecked?: boolean;
    children?: DataNode[];
}

interface CheckedItem {
    id: number;
    moduleId: number;
    operationId: number | null;
    isChecked: boolean;
}

interface TreeProps {
    roleData: DataNode[];
    handleSubmit: (values: CheckedItem[]) => void;
    isAddVisible: Boolean;
}

function sanitizeData(roleData: DataNode[]): DataNode[] {
    return JSON.parse(JSON.stringify(roleData)); // Ensure plain object structure
}

function RolePermissionTable({ roleData, handleSubmit, isAddVisible }: TreeProps) {
    const [checkedItems, setCheckedItems] = useState<CheckedItem[]>([]);
    console.log("roleData", roleData);

    useEffect(() => {
        const sanitizedRoleData = sanitizeData(roleData);

        const initialCheckedItems: CheckedItem[] = sanitizedRoleData.flatMap((module) =>
            module.children
                ? module.children.map((operation) => ({
                    id: operation.permissionId,
                    moduleId: module.moduleId,
                    operationId: operation.operationId,
                    isChecked: operation.isChecked || false,
                }))
                : []
        );
        setCheckedItems(initialCheckedItems);
    }, [roleData]);

    const handleCheckboxChange = (
        moduleId: number,
        operationId: number,
        permissionId: number,
        isChecked: boolean
    ) => {

        setCheckedItems((prevCheckedItems) => {
            console.log("checkedItemscheckedItems123456", prevCheckedItems, moduleId,
                operationId,
                permissionId,
                isChecked);
            console.log("checkedItemscheckedItems123", checkedItems);
            const updatedItems = prevCheckedItems.map((item) =>
                item.moduleId === moduleId && item.operationId === operationId && item.id === permissionId
                    ? { ...item, isChecked }
                    : item
            );

            console.log("checkedItemscheckedItems", updatedItems);
            return updatedItems;
        });

    };


    function isChecked(moduleId: number, operationId: number, permissionId: number) {
        return checkedItems.some(
            (item) =>
                item.moduleId === moduleId && item.operationId === operationId && item.id === permissionId && item.isChecked
        );
    }

    const handleSave = () => {
        handleSubmit(checkedItems);
    };

    const data: any = roleData.map((module) => {
        const permissions = { view: false, edit: false, create: false, delete: false };

        module.children?.forEach((child) => {
            if (child.operationName === "View") permissions.view = child.isChecked ?? false;
            if (child.operationName === "Edit") permissions.edit = child.isChecked ?? false;
            if (child.operationName === "Create") permissions.create = child.isChecked ?? false;
            if (child.operationName === "Delete") permissions.delete = child.isChecked ?? false;
        });

        const viewData: any = module.children?.find((child) => child.operationName === "View");
        const editData: any = module.children?.find((child) => child.operationName === "Edit");
        const createData: any = module.children?.find((child) => child.operationName === "Create");
        const deleteData: any = module.children?.find((child) => child.operationName === "Delete");

        return {
            moduleName: module.moduleName,
            view: (
                <Checkbox
                    key={`${module.moduleId}-${viewData?.operationId}-${viewData?.permissionId}`}
                    checked={isChecked(module.moduleId, viewData?.operationId, viewData?.permissionId)}
                    onCheckedChange={(checked) => {
                        handleCheckboxChange(
                            module.moduleId,
                            viewData?.operationId,
                            viewData?.permissionId,
                            Boolean(checked)
                        )
                    }}
                    className="accent-blue-600 rounded p-0 transition-all"
                />
            ),
            edit: (
                <Checkbox
                    key={`${module.moduleId}-${editData?.operationId}-${editData?.permissionId}`}
                    checked={isChecked(module.moduleId, editData?.operationId, editData?.permissionId)}
                    onCheckedChange={(checked) => {
                        handleCheckboxChange(
                            module.moduleId,
                            editData?.operationId,
                            editData?.permissionId,
                            Boolean(checked)
                        )
                    }}
                    className="accent-blue-600 rounded p-0 transition-all"
                />
            ),
            create: (
                <Checkbox
                    key={`${module.moduleId}-${createData?.operationId}-${createData?.permissionId}`}
                    checked={isChecked(module.moduleId, createData?.operationId, createData?.permissionId)}
                    onCheckedChange={(checked) => {
                        handleCheckboxChange(
                            module.moduleId,
                            createData?.operationId,
                            createData?.permissionId,
                            Boolean(checked)
                        )
                    }}
                    className="accent-blue-600 rounded p-0 transition-all"
                />
            ),
            delete: (
                <Checkbox
                    key={`${module.moduleId}-${deleteData?.operationId}-${deleteData?.permissionId}`}
                    checked={isChecked(module.moduleId, deleteData?.operationId, deleteData?.permissionId)}
                    onCheckedChange={(checked) => {
                        handleCheckboxChange(
                            module.moduleId,
                            deleteData?.operationId,
                            deleteData?.permissionId,
                            Boolean(checked)
                        )
                    }}
                    className="accent-blue-600 rounded p-0 transition-all"
                />
            ),
        };
    });

    return (
        <div className="">
            {isAddVisible && <div className="w-full my-4 flex justify-end">
                <Button onClick={handleSave}>
                    Save
                </Button>
            </div>}
            <DataTable
                columns={columns}
                data={data}
                buttonTitle={""}
                buttonUrl={"#"}
                onSearch={() => { }}
                onPageChange={() => { }}
                pageCount={50}
                currentPage={1}
                search={''}
                pageSize={50}
                isSearchEnable={false}
                isPaginationEnable={false}
            />
        </div>
    );
}

export default RolePermissionTable;
