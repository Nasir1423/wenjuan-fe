import { render, screen } from '@testing-library/react';
import QuestionInfo from '.';
import React from 'react';

// 测试用例 1: props - 默认值
test('props - 默认值', () => {
  render(<QuestionInfo />);
  const header = screen.getByText(/问卷标题/i);
  expect(header).toBeInTheDocument(); // 断言
});

// 测试用例 2: props - 自定义
test('props - 自定义', () => {
  render(<QuestionInfo title="hello" desc="world" />);
  const header = screen.getByText(/hello/i);
  expect(header).toBeInTheDocument(); // 断言
  const placeholder = screen.getByText(/world/i);
  expect(placeholder).toBeInTheDocument(); // 断言
});

// 测试用例 3: props.desc - 多行文字
test('props.desc - 多行文字', () => {
  render(<QuestionInfo desc={`hello\nworld`} />);
  const spanHello = screen.getByText('hello');
  const spanWorld = screen.getByText('world');
  expect(spanHello).toBeInTheDocument();
  expect(spanWorld).toBeInTheDocument();
  expect(spanHello).toHaveTextContent('hello');
  expect(spanWorld).toHaveTextContent('world');
});
