import React from 'react';
import { render, screen } from '@testing-library/react';
import QuestionInput from '.';

test('默认属性', () => {
  render(<QuestionInput />);
  const title = screen.getByText('输入框标题');
  expect(title).toBeInTheDocument();
  const placeholder = screen.getByPlaceholderText('请输入...');
  expect(placeholder).toBeInTheDocument();
});

test('自定义属性', () => {
  render(<QuestionInput text="hello" placeholder="world" />);
  const title = screen.getByText('hello');
  expect(title).toBeInTheDocument();
  const placeholder = screen.getByPlaceholderText('world');
  expect(placeholder).toBeInTheDocument();
});
