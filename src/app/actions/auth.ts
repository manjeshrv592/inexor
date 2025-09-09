'use server';

import { cookies } from 'next/headers';

export async function signOut() {
  // If web access is not enabled, no need to sign out
  if (process.env.WEB_ACCESS_ENABLED !== 'true') {
    return { success: true };
  }

  try {
    // Clear the authentication cookie
    const cookieStore = await cookies();
    cookieStore.set('web_access', '', { expires: new Date(0) });
    return { success: true };
  } catch (error) {
    console.error('Error during sign out:', error);
    return { success: false, error: 'Failed to sign out' };
  }
}

export async function isAuthenticated() {
  // If web access is not enabled, consider the user as authenticated
  if (process.env.WEB_ACCESS_ENABLED !== 'true') {
    return true;
  }
  
  const cookieStore = await cookies();
  const cookie = cookieStore.get('web_access');
  return !!cookie?.value;
}
