import { apiInitialization } from "../apiRequests/apiInitialization";

export async function clearLocalStorage(): Promise<void> {
  // localStorage.clear();
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("customerId");
  localStorage.removeItem("basketKey");

  sessionStorage.clear();
  await apiInitialization();
}
