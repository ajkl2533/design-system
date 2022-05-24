import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import Typography from './Typography';
import { Props } from './Typography.types';

export default {
  title: 'components/Typography',
  component: Typography,
} as Meta;

export const Default: Story = () => <Typography>Default text</Typography>;

export const Test: Story<Props> = () => (
  <Typography href="#" variant="h1">
    test
  </Typography>
);
