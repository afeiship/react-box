import React, { ElementType, forwardRef } from 'react';

/**
 * Base props for polymorphic components.
 * @template C - The element type to render as
 */
export interface PolymorphicProps<C extends ElementType> {
  as?: C;
  children?: React.ReactNode;
}

/**
 * Computed props type merging custom props with element props.
 * @template C - The element type
 */
export type Props<C extends ElementType> = PolymorphicProps<C> &
  Omit<React.ComponentProps<C>, keyof PolymorphicProps<C>>;

/**
 * Type definition for the ReactBox component.
 * @template C - The element type, defaults to 'div'
 */
type ReactBoxComponent = <C extends ElementType = 'div'>(
  props: Props<C> & { ref?: React.Ref<React.ElementRef<C>> },
) => React.JSX.Element;

/**
 * A polymorphic box component that can render as any HTML element or React component.
 * @template C - The element type, defaults to 'div'
 */
export const ReactBox = forwardRef<React.ElementRef<any>, Props<any>>(function ReactBox(
  { as: AsComponent = 'div', children, ...rest }: Props<any>,
  ref: React.Ref<React.ElementRef<any>>,
) {
  return (
    <AsComponent ref={ref} {...rest}>
      {children}
    </AsComponent>
  );
}) as ReactBoxComponent;
