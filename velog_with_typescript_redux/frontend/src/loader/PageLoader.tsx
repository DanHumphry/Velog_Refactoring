import { css } from '@emotion/core';
import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

const PageLoader = () => {
  const override = css`
    display: block;
    margin: 150px auto;
  `;
  return <FadeLoader color="black" css={override} height={5} width={5} radius={2} margin={10} />;
};
export default PageLoader;
