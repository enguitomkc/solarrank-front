import { Profile, UserProfileResponse } from "@/types/profile";
import { authenticatedRequest } from "@/utils/apiRequest";


export const userProfileApi = {
  async getUserProfile(username: string): Promise<UserProfileResponse> {
    return authenticatedRequest<UserProfileResponse>(`/users/${username}`);
  },

  async updateUserProfile(username: string, data: Profile): Promise<UserProfileResponse> {
    return authenticatedRequest<UserProfileResponse>(`/users/${username}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};