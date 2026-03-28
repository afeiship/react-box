import React from 'react';
import withProps from '@jswork/with-props';

/** Base ReactBox implementation */
function ReactBoxImpl<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any> = 'div'
>(props: Omit<React.ComponentProps<C>, 'as'> & { as?: C; children?: React.ReactNode; ref?: React.Ref<any> }): React.ReactElement {
  const { as: Component = 'div', ref, children, ...rest } = props;
  return React.createElement(Component as any, { ref, ...rest }, children);
}

/**
 * Helper function to create a ReactBox variant with proper type inference.
 * Returns a component with the exact same props as the input component.
 */
export function createReactBoxVariant<T extends Record<string, any>>(
  component: React.ComponentType<T>
): React.FC<Omit<T, 'as'>> {
  return function(props: Omit<T, 'as'>) {
    return React.createElement(component, props as any);
  } as any;
}

/** ReactBox component type with methods */
type ReactBoxType = typeof ReactBoxImpl & {
  displayName?: string;
  withProps<D extends Record<string, unknown>>(defaultProps: D): any;
  createVariant<T extends Record<string, any>>(component: React.ComponentType<T>): any;
};

/** ReactBox polymorphic component */
export const ReactBox = ReactBoxImpl as ReactBoxType;
ReactBox.displayName = 'ReactBox';
ReactBox.withProps = function<D extends Record<string, unknown>>(defaultProps: D) {
  return withProps(ReactBox as any, defaultProps);
};
ReactBox.createVariant = createReactBoxVariant;
