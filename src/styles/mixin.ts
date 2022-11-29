import { css } from 'styled-components';

export const contentCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const scroll = css`
  ::-webkit-scrollbar {
    width: 2px;
    height: 2px;
    -webkit-overflow-scrolling: auto;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #9c9eb2;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;

export const noDragText = css`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
