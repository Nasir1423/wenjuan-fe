import React from 'react';
import { render, screen } from '@testing-library/react';
import QuestionCheckbox from '.';

it('默认属性', () => {
  render(<QuestionCheckbox />);
  const header = screen.getByText('问卷多选');
  expect(header).toBeInTheDocument();
});

it('自定义属性', () => {
  const list = [
    { value: 'v1', text: 't1', checked: false },
    { value: 'v2', text: 't2', checked: true },
    { value: 'v3', text: 't3', checked: true },
  ];
  render(<QuestionCheckbox list={list} title="hello" />);
  const header = screen.getByText('hello');
  expect(header).toBeInTheDocument();
  for (let i = 1; i <= 3; i++) {
    const checkbox = screen.getByDisplayValue(`v${i}`);
    expect(checkbox).toBeInTheDocument();
    if (list[i - 1].checked) expect(checkbox.getAttribute('checked')).not.toBeNull();
    else expect(checkbox.getAttribute('checked')).toBeNull();
  }
});
