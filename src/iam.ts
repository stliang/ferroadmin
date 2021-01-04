import * as admin from 'firebase-admin';

// User roles
export const roles: string[] = ['anonymous', 'basic', 'prime', 'admin'];

// User privilege levels
export const adminLevel = roles;
export const paidLevel = roles.slice(0, adminLevel.length - 1);
export const basicLevel = roles.slice(0, paidLevel.length - 1);
export const anonymousLevel = roles.slice(0, basicLevel.length - 1);

export type Role = string[];

export async function grantRole(role: string, email: string): Promise<void> {
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && (user.customClaims as any).userRole === role) {
    return;
  }
  if (roles.includes(role)) {
    return admin.auth().setCustomUserClaims(user.uid, {
      userRole: role,
    });
  } else {
    return admin.auth().setCustomUserClaims(user.uid, {
      userRole: roles[0],
    });
  }
}

export async function checkAuth(idToken: string): Promise<void> {
  const decoded = await admin.auth().verifyIdToken(idToken);
  if (decoded.userRole !== 'admin') {
    throw new Error('User does not have admin privileges');
  }
}

export async function getUser(email: string): Promise<admin.auth.UserRecord> {
  return admin.auth().getUserByEmail(email);
}

export async function listUsers(): Promise<admin.auth.ListUsersResult> {
  return admin.auth().listUsers();
}