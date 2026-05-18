import styled from 'styled-components';
import { media } from '@app/styles/themes/constants';

/**
 * Styled components for AuthLayout
 * Contains only layout-specific styles
 */

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

export const BackgroundWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background: linear-gradient(175deg, #fff -5.96%, var(--primary-color) 99.81%);
  position: relative;

  ${import.meta.env.VITE_TYPE_LOGIN === '3' &&
  `.header-login {
    display: none;
    @media only screen and (${media.xl}) {
      display: block;
    }
    position: absolute;
    top: 50%;
    right: 0px;
    left: unset;
    transform: translate(-50%, -50%);
    &__logo {
      text-align: center;
      img {
        width: 420px;
        height: 420px;
      }
    }
    &__title {
      font-size: 24px;
      margin-left: 1.5rem;
      text-align: center;
      flex: 1;
      @media only screen and (${media.lg}) {
        margin-bottom: 5rem;
        font-size: 32px;
      }
    }
  }`}
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  right: ${import.meta.env.VITE_TYPE_LOGIN === '3' || import.meta.env.VITE_TYPE_LOGIN === '1' ? 'unset' : '0'};
  left: ${import.meta.env.VITE_TYPE_LOGIN === '1' ? '50%' : 'unset'};
  transform: translate(-50%, -50%);
  box-shadow: var(--box-shadow-login);
  border-radius: 20px;
  border: 2px solid var(--border-color);
  background-color: var(--background-color);
  @media only screen and (${media.xl}) {
    right: ${import.meta.env.VITE_TYPE_LOGIN === '1' ? 'unset' : '0'};
  }
`;

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: var(--box-shadow-login);
  border-radius: 20px;
  background-color: var(--background-color);
`;
