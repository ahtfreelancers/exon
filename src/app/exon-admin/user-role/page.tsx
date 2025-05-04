import { redirect } from 'next/navigation';
import RolePermissions from './__components/role-permissions';
import { auth } from '../../../../auth';
import { isPermissionExists } from '@/lib/auth';
import NoAccess from '@/components/no-access';

export default async function UserRolePage() {
  const session: any = await auth()
  const permissions = session?.user?.role_permissions

  if (!session) {
    return redirect('/exon-admin')
  }

  if (!isPermissionExists(permissions, "Permission:View")) {
    return <NoAccess />
  }
  if (!session) {
    return redirect('/exon-login');
  }


  return (
    <RolePermissions createVisible={isPermissionExists(permissions, "Permission:Edit")} />
  );
}
