import React from 'react';
import { render, screen } from '@testing-library/react';
import QuestionParagraph from '.';

test('默认属性', () => {
  render(<QuestionParagraph />);
  const span = screen.getByText('一行段落');
  expect(span).toBeInTheDocument();
});

test('自定义属性', () => {
  render(<QuestionParagraph text="hello" isCenter={true} />);
  const span = screen.getByText('hello');
  expect(span).toBeInTheDocument();
  const paragraph = span.parentElement;
  expect(paragraph).not.toBeNull();
  expect(paragraph?.style.textAlign).toBe('center');
});

test('多行文字', () => {
  render(<QuestionParagraph text={'hello\nworld'} />);
  const span = screen.getByText('hello');
  expect(span).toBeInTheDocument();
  expect(span).toHaveTextContent('hello');
  expect(span).not.toHaveTextContent('helloworld');
});
