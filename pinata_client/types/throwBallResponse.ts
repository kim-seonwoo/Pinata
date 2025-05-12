export interface ThrowBallResponse {
  success: boolean;
  name?: string;
  imageUrl?: string;
  reason?: "not_lucky" | "no_more_gift" | "network_error";
  updatedBall?: number;
}
