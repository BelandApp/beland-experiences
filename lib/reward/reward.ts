import { apiFetch } from "../core";

export type reward = {
  email: string;
  code: string;
};
export async function claimReward(data: reward) {
  return apiFetch("/rewards/claim", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
