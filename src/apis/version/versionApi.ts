import { API } from '../axios';
import type { VersionRequest, VersionResponse } from '../../types/version/versionTypes';

// 버전 선택 API
export const selectVersion = async (data: VersionRequest): Promise<VersionResponse> => {
  const response = await API.post('/users/version', data);
  return response.data;
};
