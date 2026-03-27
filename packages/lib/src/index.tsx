import React, { forwardRef } from 'react';
import withProps from '@jswork/with-props';
import type { Props, ReactBoxComponent, PolymorphicProps } from './types';

/**
 * Internal forwarded ref implementation of ReactBox.
 *
 * @remarks
 * This is the actual component implementation that uses `forwardRef` to support
 * ref forwarding to the underlying element. It's defined separately to allow
 * for proper typing when exporting with static methods.
 */
const ReactBoxForwarded = forwardRef<HTMLDivElement, Omit<Props<'div'>, 'ref'>>(
  function ReactBox(
    { as, children, ...rest }: Omit<Props<'div'>, 'ref'>,
    ref,
  ) {
    // Runtime logic: use 'as' if provided, otherwise default to 'div'
    const Component = as || 'div';

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  },
);

/**
 * A polymorphic box component that can render as any HTML element or React component.
 *
 * @remarks
 * ReactBox is a flexible component that allows you to change the rendered element type
 * using the `as` prop while maintaining a consistent API. It supports ref forwarding
 * and inherits all native props of the target element.
 *
 * ## Features
 *
 * - **Polymorphic**: Render as any HTML element or custom component via the `as` prop
 * - **Type Safe**: Full TypeScript support with proper type inference
 * - **Ref Forwarding**: Refs are properly forwarded to the underlying element
 * - **Composable**: Use the `withProps` method to create preset variants
 *
 * ## Examples
 *
 * ### Basic Usage
 * ```tsx
 * import { ReactBox } from '@react-box/lib';
 *
 * // Renders as a div (default)
 * <ReactBox>Hello World</ReactBox>
 *
 * // Render as a button
 * <ReactBox as="button" onClick={() => console.log('clicked')}>
 *   Click Me
 * </ReactBox>
 *
 * // Render as a link with proper attributes
 * <ReactBox as="a" href="https://example.com">
 *   Visit Example
 * </ReactBox>
 * ```
 *
 * ### With Custom Component
 * ```tsx
 * const CustomCard = ({ title, children }) => (
 *   <div className="card">
 *     <h3>{title}</h3>
 *     {children}
 *   </div>
 * );
 *
 * <ReactBox as={CustomCard} title="Card Title">
 *   Card content goes here
 * </ReactBox>
 * ```
 *
 * ### Using `withProps` for Variants
 * ```tsx
 * const PrimaryButton = ReactBox.withProps({
 *   as: 'button',
 *   className: 'btn btn-primary',
 * });
 *
 * const SecondaryButton = ReactBox.withProps({
 *   as: 'button',
 *   className: 'btn btn-secondary',
 * });
 *
 * <PrimaryButton type="submit">Submit</PrimaryButton>
 * <SecondaryButton type="button">Cancel</SecondaryButton>
 * ```
 *
 * ### With Ref
 * ```tsx
 * const InputBox = () => {
 *   const ref = useRef<HTMLInputElement>(null);
 *
 *   const focus = () => ref.current?.focus();
 *
 *   return (
 *     <>
 *       <ReactBox as="input" ref={ref} type="text" />
 *       <button onClick={focus}>Focus Input</button>
 *     </>
 *   );
 * };
 * ```
 */
export const ReactBox = Object.assign(ReactBoxForwarded as unknown as ReactBoxComponent, {
  /**
   * Creates a new ReactBox component with preset default props.
   *
   * @template D - The type of the default props object.
   * @param defaultProps - An object containing props that should be applied by default.
   * @returns A new ReactBox component with the default props applied.
   *
   * @remarks
   * This method is useful for creating reusable component variants with preset styles,
   * behaviors, or configurations. The returned component can still accept additional
   * props that will override the defaults.
   *
   * @example
   * ```tsx
   * // Create a card variant with default styling
   * const Card = ReactBox.withProps({
   *   as: 'div',
   *   className: 'card shadow-lg rounded',
   * });
   *
   * // Usage - additional props override defaults
   * <Card className="card bg-blue">Blue Card</Card>
   * ```
   */
  withProps<D extends Record<string, unknown>>(
    this: ReactBoxComponent,
    defaultProps: D,
  ): ReactBoxComponent {
    return withProps(this, defaultProps) as ReactBoxComponent;
  },
});

// Re-export types for external use
export type { ReactBoxProps } from './types';
export type { PolymorphicProps, Props, ReactBoxComponent };
