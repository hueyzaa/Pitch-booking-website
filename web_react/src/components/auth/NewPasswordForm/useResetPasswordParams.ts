import { useMemo } from 'react';
import queryString from 'query-string';
import { ResetPasswordParams } from './NewPasswordForm.types';

/**
 * Custom hook for parsing URL parameters for password reset
 * Extracts token and email from URL query string
 */
export const useResetPasswordParams = (): ResetPasswordParams => {
  const params = useMemo(() => {
    const url = window.location.href;
    const parsed = queryString.parseUrl(url);

    return {
      token: (parsed.query.token as string) || null,
      email: (parsed.query.email as string) || null
    };
  }, []);

  return params;
};
