const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function httpGet<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Błąd żądania: ${response.status}`);
  }
  return response.json() as Promise<T>;
}
