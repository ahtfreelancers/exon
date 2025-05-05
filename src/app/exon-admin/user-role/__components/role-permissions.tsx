'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import RolePermissionTable from './TableTree';
import { toast } from 'sonner';
import { getAllPermissions, getAllRole, updateRolePermissions } from '@/actions/role';
export interface RoleProps {
    id: number
    name: string
}

export default function RolePermissions(props: any) {
    const [roles, setRoles] = useState([])
    const [selectedRole, setSelectedRole] = useState('')
    const [permissions, setPermissions] = useState([])

    const fetchRoles = async () => {
        let params = {
            pageIndex: 1,
            pageSize: 30
        }

        try {
            const { data, isSuccess }: any = await getAllRole(params)
            if (isSuccess) {
                const excludedRoleData = data.items.filter((item: RoleProps) => item.id !== 1)
                setRoles(excludedRoleData)
            }
        } catch (err) {
            console.log(`err`, err);
            // setError(err.message || 'An error occurred')
        }
    }

    useEffect(() => {
        fetchRoles()
        fetchPermissions(1);
    }, [])

    const fetchPermissions = async (value: any) => {
        const params = {
            RoleId: Number(selectedRole),
            // RoleId: Number(value),
        };

        try {
            const { data, isSuccess }: any = await getAllPermissions(params);

            if (isSuccess) {
                const convertedPermissions = data.map((module: any, moduleIndex: number) => ({
                    id: `${moduleIndex + 1}`,
                    moduleId: module.moduleId,
                    moduleName: module.moduleName,
                    children: module.operations.map((operation: any, operationIndex: number) => ({
                        id: `${moduleIndex + 1}-${operationIndex + 1}`,
                        operationName: operation.operationName,
                        permissionId: operation.permissionId,
                        operationId: operation.id,
                        isChecked: operation.isChecked
                    }))
                }));
                setPermissions(convertedPermissions)
            }
        } catch (err) {
            console.log(`err`, err);
            // setError(err.message || 'An error occurred')
        }
    }

    const handleOnChange = async (value: any) => {
        setSelectedRole(value)

        await fetchPermissions(value)
    }

    const handleSubmit = async (updatedPermissions: any) => {
        try {
            const { data, isSuccess }: any = await updateRolePermissions(updatedPermissions)
            if (isSuccess) {
                toast.success('Permissions has been updated successfully!')
                // fetchPermissions(selectedRole)
            }
        } catch (err) {
            console.log(`err`, err);
            // setError(err.message || 'An error occurred')
        }
    }

    if (roles.length === 0) return null

    return (
        <div className="p-4">
            <h1 className='mb-6 text-2xl font-bold'>User Roles</h1>
            <div className='max-w-[400px]'>
                <Select
                    // disabled={isPending}
                    onValueChange={handleOnChange}
                    defaultValue={`${selectedRole}`}
                >
                    <SelectTrigger
                        className="text-black"
                    >
                        <SelectValue placeholder="Please select a role" />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                        {roles && roles.map((role: RoleProps) => (
                            <SelectItem key={role.id} value={role?.id?.toString() ?? ''}>
                                {role.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <RolePermissionTable
                roleData={permissions}
                isAddVisible={props.createVisible}
                handleSubmit={(values) => handleSubmit(values)}
            />
        </div>
    );
}