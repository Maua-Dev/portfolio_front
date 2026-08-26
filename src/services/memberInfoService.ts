import type { MemberInfoResponse } from "../types/memberInfo";

const API_URL = import.meta.env.VITE_MEMBER_INFO_API_URL;

export async function fetchMemberInfo(): Promise<MemberInfoResponse> {
  const response = await fetch(API_URL, { method: "GET" });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}