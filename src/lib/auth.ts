import jwt from 'jsonwebtoken';
import { auth } from '../../auth';

export const currentUser = async () => {
    const session = await auth();

    return session?.user
}

export const isPermissionExists = (permissions: string[] | undefined, permissionToCheck: string): boolean => {
    return permissions ? permissions.includes(permissionToCheck) : false;
}
