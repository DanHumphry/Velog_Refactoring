import React from 'react';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';

function ButtonLoader() {
  const override = css`
    display: block;
  `;
  return <BarLoader color="#ffffff" css={override} height={5} width="100%" />;
}
export default ButtonLoader;
