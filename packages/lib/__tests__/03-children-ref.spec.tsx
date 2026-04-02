/**
 * @file 03-children-ref.spec.tsx
 * @purpose 测试 ReactBox 组件的 children 渲染和 ref 转发行为
 * @description
 *   - 验证文本 children 正确渲染
 *   - 验证 JSX 元素 children 正确渲染
 *   - 验证嵌套 ReactBox 作为 children
 *   - 验证多个 children 正确渲染
 *   - 验证 ref 正确转发到原生 DOM 元素
 *   - 验证 ref 正确转发到自定义组件
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { ReactBox } from '../src';

describe('ReactBox children rendering', () => {
  it('should render text children', () => {
    render(<ReactBox>hello world</ReactBox>);
    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  it('should render JSX element children', () => {
    render(
      <ReactBox>
        <strong>bold</strong> and <em>italic</em>
      </ReactBox>,
    );
    expect(screen.getByText('bold')).toBeInTheDocument();
    expect(screen.getByText('italic')).toBeInTheDocument();
  });

  it('should render nested ReactBox as children', () => {
    render(
      <ReactBox as="ul">
        <ReactBox as="li">item 1</ReactBox>
        <ReactBox as="li">item 2</ReactBox>
        <ReactBox as="li">item 3</ReactBox>
      </ReactBox>,
    );
    expect(screen.getByText('item 1')).toBeInTheDocument();
    expect(screen.getByText('item 2')).toBeInTheDocument();
    expect(screen.getByText('item 3')).toBeInTheDocument();
    const items = screen.getAllByText(/item \d/);
    expect(items).toHaveLength(3);
    items.forEach((item) => {
      expect(item.closest('li')).toBeInTheDocument();
    });
  });

  it('should render multiple children correctly', () => {
    render(
      <ReactBox>
        <span>first</span>
        <span>second</span>
        <span>third</span>
      </ReactBox>,
    );
    expect(screen.getByText('first')).toBeInTheDocument();
    expect(screen.getByText('second')).toBeInTheDocument();
    expect(screen.getByText('third')).toBeInTheDocument();
  });

  it('should render without children', () => {
    const { container } = render(<ReactBox />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild!.textContent).toBe('');
  });
});

describe('ReactBox ref forwarding', () => {
  it('should forward ref to the default div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ReactBox ref={ref}>content</ReactBox>);
    expect(ref.current).not.toBeNull();
    expect(ref.current!.nodeName).toBe('DIV');
  });

  it('should forward ref to a span element', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<ReactBox as="span" ref={ref}>content</ReactBox>);
    expect(ref.current).not.toBeNull();
    expect(ref.current!.nodeName).toBe('SPAN');
  });

  it('should forward ref to an input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<ReactBox as="input" ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current!.nodeName).toBe('INPUT');
  });

  it('should forward ref to a custom component', () => {
    const CustomComp = React.forwardRef<HTMLDivElement, { children?: React.ReactNode }>(
      ({ children }, fwdRef) => <div ref={fwdRef}>{children}</div>,
    );
    const ref = React.createRef<HTMLDivElement>();
    render(<ReactBox as={CustomComp} ref={ref}>custom</ReactBox>);
    expect(ref.current).not.toBeNull();
    expect(ref.current!.nodeName).toBe('DIV');
  });
});
