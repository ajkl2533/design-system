import React from 'react';
import styled from 'styled-components';

import { PolymorphicRef } from '../../types/polymorphicComponent.types';
import { TextComponent, TextProps } from './Typography.types';

const TypographyRoot = styled.span``;

const tagMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  md: 'p',
  sm: 'p',
  inherit: 'a',
} as const;

const Typography: TextComponent = React.forwardRef(
  <C extends React.ElementType = 'p'>(
    {
      as,
      children,
      font = 'regular',
      size = 'md',
      variant = 'primary',
      ...other
    }: TextProps<C>,
    ref?: PolymorphicRef<C>,
  ): React.ReactElement | null => {
    const classes = `${variant} ${font} ${size}`;
    const asComponent = as || tagMapping[size] || 'p';

    return (
      <TypographyRoot as={asComponent} {...other} ref={ref} className={classes}>
        {children}
      </TypographyRoot>
    );
  },
);

export default Typography;
