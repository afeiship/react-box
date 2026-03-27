import React, { ElementType, forwardRef } from 'react';
import withProps, { Props, WithPropsReturnType } from '@jswork/with-props';

/**
 * A polymorphic box component with static `withProps` method.
 * @template C - The element type to render (defaults to 'div')
 */
type ReactBoxComponent = (<C extends ElementType = 'div'>(
  props: Props<C> & { ref?: React.Ref<React.ComponentRef<C>> },
) => React.ReactElement) & {
  displayName?: string;
  /** Creates a new component with merged default props */
  withProps<D extends Record<string, unknown>>(this: ReactBoxComponent, defaultProps: D): WithPropsReturnType<D>;
};

/** Internal forwarded component implementation */
const ReactBoxForwarded = forwardRef<HTMLDivElement, Omit<Props<'div'>, 'ref'>>(function ReactBox(
  { as, children, ...rest }: Omit<Props<'div'>, 'ref'>,
  ref,
) {
  const Component = as || 'div';

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

/** Polymorphic box component that renders any HTML element */
export const ReactBox = Object.assign(ReactBoxForwarded as unknown as ReactBoxComponent, {
  /** Creates a new component with merged default props */
  withProps<D extends Record<string, unknown>>(this, defaultProps: D): WithPropsReturnType<D> {
    return withProps(this, defaultProps);
  },
});

/** Props type for ReactBox component */
export type ReactBoxProps<C extends ElementType> = Props<C>;
