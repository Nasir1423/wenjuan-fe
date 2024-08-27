import React from 'react';
import { render, screen } from '@testing-library/react';
import QuestionTextArea from '.';

test('默认属性', () => {
  render(<QuestionTextArea />);
  const title = screen.getByText('多行输入');
  expect(title).toBeInTheDocument();
  const placeholder = screen.getByPlaceholderText('请输入内容');
  expect(placeholder).toBeInTheDocument();
});

test('自定义属性', () => {
  render(<QuestionTextArea title="hello" text="world" />);
  const title = screen.getByText('hello');
  expect(title).toBeInTheDocument();
  const placeholder = screen.getByPlaceholderText('world');
  expect(placeholder).toBeInTheDocument();
});
