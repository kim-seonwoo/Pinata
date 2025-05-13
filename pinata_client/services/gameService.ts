import { ThrowBallResponse } from "@/types/throwBallResponse";

export async function throwBallRequest(
  userId: string,
  hit: boolean
): Promise<ThrowBallResponse> {
  try {
    const url = process.env.EXPO_PUBLIC_FIREBASE_FUNCTIONS_DOMAIN;
    if (!url)
      throw new Error("Missing env: EXPO_PUBLIC_FIREBASE_FUNCTIONS_DOMAIN");

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, hit }),
    });

    return await res.json();
  } catch (e) {
    return { success: false, reason: "network_error" };
  }
}
