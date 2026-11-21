import { useUserStore } from '../stores/user';

/** The login token saved by the user store (or null if not logged in). */
export function getToken() {
  try {
    return JSON.parse(localStorage.getItem('token'));
  } catch {
    return null;
  }
}

let handlingExpiredLogin = false;

/** Log out locally and go to the start page with a message (only once, even if several calls fail). */
export function handleExpiredLogin() {
  if (handlingExpiredLogin) return;
  handlingExpiredLogin = true;
  useUserStore().logout();
  window.alert('Din inloggning har gått ut. Logga in igen.');
  window.location.href = '/';
}

/**
 * fetch() for dashboard (admin) API calls: sends the login token.
 * If the API answers 401 (not logged in / token no longer valid),
 * the user is logged out and sent to the start page.
 */
export async function authFetch(url, options = {}) {
  const token = getToken();
  const headers = {
    Accept: 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: 'Bearer ' + token } : {})
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    handleExpiredLogin();
  }
  return response;
}
