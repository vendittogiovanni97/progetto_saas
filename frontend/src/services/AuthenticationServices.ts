import { API_CONFIG, API_ENDPOINTS } from "@/lib/api/config";

export async function loginRequest(email: string, password: string): Promise<string> {
  const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.AUTH.LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || 'Login fallito');
  }

  if(!data.token){
    throw new Error('Token non trovato');
  }

  return data.token;
}