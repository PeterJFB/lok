import { browser } from '$app/env';
import { callApi } from '$lib/client/api';
import { getOrCreateDeviceIdentifier } from '$lib/client/auth';
import type { LayoutLoad } from './$types';
import type { GetTokenReqBody, GetTokenResBody } from './auth/get-token-and-user/+server';

export const load: LayoutLoad = async ({ data, fetch }) => {
  if (browser) {
    if (data.user) {
      return { user: data.user };
    }
    const deviceId = getOrCreateDeviceIdentifier();
    if (!deviceId) {
      return { anonymous: true };
    }

    // User has deviceId but no user (invalid cookie). Make an attempt to authenticate
    const userReq = await callApi
      .using(fetch)
      .post<GetTokenReqBody, GetTokenResBody>('/auth/get-token-and-user', {
        deviceIdType: 'LOCAL_STORAGE',
        deviceIdValue: deviceId
      });

    if (!userReq.isOk) {
      // Failed to authenticate, assume DeviceIdentifier is invalid
      return { anonymous: true };
    }
    // Managed to create token, reloading page
    return window.location.reload();
  }
};
