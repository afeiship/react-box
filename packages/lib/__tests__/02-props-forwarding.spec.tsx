/**
 * @file 02-props-forwarding.spec.tsx
 * @purpose 测试 ReactBox 组件的属性转发行为
 * @description
 *   - 验证 className、id、style 等 HTML 属性正确透传到目标元素
 *   - 验证特定元素属性的透传（如 a 的 href/target、input 的 type/placeholder）
 *   - 验证 data-* 和 aria-* 属性的透传
 *   - 验证事件处理器（onClick）的透传
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import React from 'react';
import { ReactBox } from '../src';

describe('ReactBox props forwarding', () => {
  it('should forward className to the rendered element', () => {
    const { container } = render(<ReactBox className="my-class">content</ReactBox>);
    expect(container.firstChild).toHaveClass('my-class');
  });

  it('should forward multiple classNames', () => {
    const { container } = render(<ReactBox className="class-a class-b">content</ReactBox>);
    expect(container.firstChild).toHaveClass('class-a', 'class-b');
  });

  it('should forward id to the rendered element', () => {
    const { container } = render(<ReactBox id="my-id">content</ReactBox>);
    expect(container.firstChild).toHaveAttribute('id', 'my-id');
  });

  it('should forward style to the rendered element', () => {
    const { container } = render(<ReactBox style={{ color: 'red' }}>content</ReactBox>);
    expect(container.firstChild).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('should forward href and target to <a> element', () => {
    const { container } = render(
      <ReactBox as="a" href="https://example.com" target="_blank">
        link
      </ReactBox>,
    );
    expect(container.firstChild).toHaveAttribute('href', 'https://example.com');
    expect(container.firstChild).toHaveAttribute('target', '_blank');
  });

  it('should forward type and placeholder to <input> element', () => {
    const { container } = render(<ReactBox as="input" type="email" placeholder="Enter email" />);
    expect(container.firstChild).toHaveAttribute('type', 'email');
    expect(container.firstChild).toHaveAttribute('placeholder', 'Enter email');
  });

  it('should forward data-* attributes', () => {
    const { container } = render(<ReactBox data-testid="box" data-role="container">content</ReactBox>);
    expect(container.firstChild).toHaveAttribute('data-testid', 'box');
    expect(container.firstChild).toHaveAttribute('data-role', 'container');
  });

  it('should forward aria-* attributes', () => {
    const { container } = render(<ReactBox aria-label="main content" role="region">content</ReactBox>);
    expect(container.firstChild).toHaveAttribute('aria-label', 'main content');
    expect(container.firstChild).toHaveAttribute('role', 'region');
  });

  it('should forward onClick handler', async () => {
    const handleClick = vi.fn();
    render(<ReactBox onClick={handleClick}>clickable</ReactBox>);
    await userEvent.click(screen.getByText('clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should forward title attribute', () => {
    const { container } = render(<ReactBox title="tooltip text">content</ReactBox>);
    expect(container.firstChild).toHaveAttribute('title', 'tooltip text');
  });
});
