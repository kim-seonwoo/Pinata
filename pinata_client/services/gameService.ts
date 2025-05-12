import { ThrowBallResponse } from "@/types/throwBallResponse";

export async function throwBallRequest(
  userId: string
): Promise<ThrowBallResponse> {
  try {
    const url = process.env.EXPO_PUBLIC_FIREBASE_FUNCTIONS_DOMAIN;
    if (!url) {
      throw new Error("EXPO_PUBLIC_WEB_CLIENT_ID is not defined");
    }
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    return await res.json();
  } catch (e) {
    return { success: false, reason: "network_error" };
  }
}
