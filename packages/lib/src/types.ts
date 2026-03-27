import React, { type ElementType } from 'react';

/**
 * Base props interface for the polymorphic component.
 *
 * @template C - The target element type or component type.
 *
 * @remarks
 * This interface defines the foundational props that are always available
 * on the ReactBox component, regardless of which element type is rendered.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ReactBox as="button">Click me</ReactBox>
 *
 * // With a custom component
 * <ReactBox as={CustomComponent}>Content</ReactBox>
 * ```
 */
export interface PolymorphicProps<C extends ElementType> {
  /**
   * The element type or component to render.
   *
   * @defaultValue `'div'`
   *
   * @remarks
   * When specified, the component will render as this element type and inherit
   * all of its native props (e.g., `as="button"` allows `onClick`, `type`, etc.).
   */
  as?: C;
  /**
   * Child nodes to be rendered within the component.
   */
  children?: React.ReactNode;
}

/**
 * Computes the complete props type for a given element type.
 *
 * @template C - The target element type or component type.
 *
 * @remarks
 * This type combines the custom polymorphic props with the native props of
 * the target element type, while removing any conflicting keys. This ensures
 * type safety and proper intelliSense when using the `as` prop.
 *
 * The logic follows: `(Custom Props) & (Native Props of C - Conflicting Keys)`
 *
 * @example
 * ```tsx
 * // When as="button", Props includes button attributes:
 * type ButtonProps = Props<'button'>;
 * // ButtonProps includes: as?, children?, onClick?, type?, disabled?, etc.
 * ```
 */
export type Props<C extends ElementType> = PolymorphicProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, 'as' | 'children'>;

/**
 * Type definition for the ReactBox component with static methods.
 *
 * @template C - The default element type (defaults to `'div'`).
 *
 * @remarks
 * This type enables proper type inference when using the component, including
 * ref forwarding and generic element type switching.
 *
 * @example
 * ```tsx
 * // Type inference works automatically
 * const box = <ReactBox as="button" onClick={() => {}} />;
 * ```
 */
export type ReactBoxComponent = (<C extends ElementType = 'div'>(
  props: Props<C> & { ref?: React.Ref<React.ComponentRef<C>> },
) => React.ReactElement) & {
  /** Display name for debugging purposes. */
  displayName?: string;
  /**
   * Creates a new component with preset default props.
   *
   * @template D - The type of default props object.
   * @param defaultProps - The default props to apply.
   * @returns A new ReactBox component with default props applied.
   *
   * @example
   * ```tsx
   * const PrimaryBox = ReactBox.withProps({ className: 'primary' });
   * <PrimaryBox>Always has primary class</PrimaryBox>
   * ```
   */
  withProps<D extends Record<string, unknown>>(
    this: ReactBoxComponent,
    defaultProps: D,
  ): ReactBoxComponent;
};

/**
 * Exported props type for external use.
 *
 * @template C - The target element type or component type.
 *
 * @remarks
 * Use this type when you need to extend or reference the props type
 * in your own components or type definitions.
 *
 * @example
 * ```tsx
 * import type { ReactBoxProps } from '@react-box/lib';
 *
 * interface MyComponentProps extends ReactBoxProps<'div'> {
 *   customProp: string;
 * }
 * ```
 */
export type ReactBoxProps<C extends ElementType> = Props<C>;
