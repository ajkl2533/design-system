import { PolymorphicComponentPropsWithRef } from '../../types/polymorphicComponent.types';

export type DefaultTagMap = {
  h1: 'h1';
  h2: 'h2';
  h3: 'h3';
  h4: 'h4';
  h5: 'h5';
  md: 'p';
  sm: 'p';
  inherit: 'a';
};

export interface Props {
  children: React.ReactNode;
  variant?: string;
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'md' | 'sm' | 'inherit';
}

export type TextProps<C extends React.ElementType> =
  PolymorphicComponentPropsWithRef<C, Props>;

export type TextComponent = <C extends React.ElementType>(
  props: TextProps<C>,
) => React.ReactElement | null;
