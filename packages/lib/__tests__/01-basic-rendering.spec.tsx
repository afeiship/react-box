/**
 * @file 01-basic-rendering.spec.tsx
 * @purpose 测试 ReactBox 组件的基础渲染行为
 * @description
 *   - 不传 as 时默认渲染为 <div>
 *   - 通过 as prop 渲染为不同 HTML 元素（span, section, article, header 等）
 *   - 通过 as prop 渲染为自闭合元素（input, img, br, hr）
 *   - 通过 as prop 渲染为自定义 React 组件，验证 props 透传
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { ReactBox } from '../src';

describe('ReactBox basic rendering', () => {
  it('should render as <div> by default', () => {
    const { container } = render(<ReactBox>content</ReactBox>);
    expect(container.firstChild!.nodeName).toBe('DIV');
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('should render as <span> when as="span"', () => {
    const { container } = render(<ReactBox as="span">text</ReactBox>);
    expect(container.firstChild!.nodeName).toBe('SPAN');
    expect(screen.getByText('text')).toBeInTheDocument();
  });

  it('should render as <section> when as="section"', () => {
    const { container } = render(<ReactBox as="section">section content</ReactBox>);
    expect(container.firstChild!.nodeName).toBe('SECTION');
  });

  it('should render as <article> when as="article"', () => {
    const { container } = render(<ReactBox as="article">article content</ReactBox>);
    expect(container.firstChild!.nodeName).toBe('ARTICLE');
  });

  it('should render as <header> when as="header"', () => {
    const { container } = render(<ReactBox as="header">header</ReactBox>);
    expect(container.firstChild!.nodeName).toBe('HEADER');
  });

  it('should render as <main> when as="main"', () => {
    const { container } = render(<ReactBox as="main">main</ReactBox>);
    expect(container.firstChild!.nodeName).toBe('MAIN');
  });

  it('should render as <footer> when as="footer"', () => {
    const { container } = render(<ReactBox as="footer">footer</ReactBox>);
    expect(container.firstChild!.nodeName).toBe('FOOTER');
  });

  it('should render as <nav> when as="nav"', () => {
    const { container } = render(<ReactBox as="nav">nav</ReactBox>);
    expect(container.firstChild!.nodeName).toBe('NAV');
  });

  it('should render as <a> when as="a"', () => {
    const { container } = render(<ReactBox as="a">link</ReactBox>);
    expect(container.firstChild!.nodeName).toBe('A');
  });

  it('should render as <button> when as="button"', () => {
    const { container } = render(<ReactBox as="button">click me</ReactBox>);
    expect(container.firstChild!.nodeName).toBe('BUTTON');
  });

  it('should render as <input> when as="input"', () => {
    const { container } = render(<ReactBox as="input" placeholder="type here" />);
    expect(container.firstChild!.nodeName).toBe('INPUT');
  });

  it('should render as <img> when as="img"', () => {
    const { container } = render(<ReactBox as="img" alt="test image" src="/photo.jpg" />);
    expect(container.firstChild!.nodeName).toBe('IMG');
  });

  it('should render as a custom React component', () => {
    const Card = ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
      <div data-testid="card" {...rest}>{children}</div>
    );
    render(<ReactBox as={Card}>card content</ReactBox>);
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText('card content')).toBeInTheDocument();
  });

  it('should forward props to custom component', () => {
    const Label = ({ text, children }: { text: string; children?: React.ReactNode }) => (
      <span data-testid="label">{text}{children}</span>
    );
    render(<ReactBox as={Label} text="hello ">world</ReactBox>);
    expect(screen.getByTestId('label')).toHaveTextContent('hello world');
  });
});
