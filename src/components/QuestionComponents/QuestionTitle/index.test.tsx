import React from 'react';
import { render, screen } from '@testing-library/react';
import QuestionTitle from '.';

test('默认属性', () => {
  render(<QuestionTitle />);
  const header = screen.getByText('一行标题');
  expect(header).toBeInTheDocument();
});

test('自定义属性', () => {
  render(<QuestionTitle text="hello" level={2} alignCenter={true} />);
  const header = screen.getByText('hello');
  expect(header).toBeInTheDocument();
  expect(header.matches('h2')).toBeTruthy();
  expect(header.style.textAlign).toBe('center');
});
