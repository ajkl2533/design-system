import { DefaultTheme } from 'styled-components';
import { ReactComponentLike } from 'prop-types';

import { SpaceSize } from '../../theme/space.types';
import { ActionKinds } from '../../types/action.types';
import { CardDirections } from './Card.enums';

export type Directions = typeof CardDirections[keyof typeof CardDirections];

export interface CardActionsProps {
  /**
   * List of available actions for the Card footer (maximal number of actions is 2)
   */
  actions: ActionKinds<React.MouseEvent[]>[];
}

export interface CardHeaderProps {
  /**
   * Card main title
   */
  title: string;
  /**
   * Subtitle text
   */
  subtitle?: string;
  /**
   * List of available actions in the dropdown menu
   */
  actions?: ActionKinds<React.MouseEvent[]>[];
  /**
   * Actions menu aria label
   */
  actionsButtonLabel?: string;
}

export interface CardMediaProps {
  /**
   * `src` attribute for media elements. If no media element is specified in the `as` property this
   * source will be used as a `background-image` for element.
   */
  mediaSrc?: string;
  /**
   * Custom css `style` attribute
   */
  style?: React.CSSProperties;
  /**
   * Alternative text from media elements
   */
  alt?: string;
  /**
   * Can specify any element or React component.
   */
  as?: ReactComponentLike;
}

export interface CardMediaWrapperProps {
  $isMediaComponent: boolean;
  $isImageComponent: boolean;
}

export interface CardProps {
  /**
   * Main card axis controls layout primitive that will be used as a children wrapper
   */
  direction?: Directions;
}

export interface CardWrapperProps {
  paddingSize: SpaceSize;
  $direction: CardProps['direction'];
}

export interface CardWrapperPropsWithTheme extends CardWrapperProps {
  theme: DefaultTheme;
}
