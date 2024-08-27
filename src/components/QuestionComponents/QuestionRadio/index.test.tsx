import React from 'react';
import { render, screen } from '@testing-library/react';
import QuestionRadio from '.';

it('默认属性', () => {
  render(<QuestionRadio />);
  const header = screen.getByText('问卷单选');
  expect(header).toBeInTheDocument();
});

it('自定义属性', () => {
  const options = [
    { value: 'v1', text: 't1' },
    { value: 'v2', text: 't2' },
    { value: 'v3', text: 't3' },
  ];
  const value = 'v1';
  render(<QuestionRadio options={options} title="hello" value={value} />);
  const header = screen.getByText('hello');
  expect(header).toBeInTheDocument();
  for (let i = 1; i <= 3; i++) {
    const curVal = `v${i}`;
    const radio = screen.getByDisplayValue(curVal);
    expect(radio).toBeInTheDocument();
    const label = screen.getByText(`t${i}`);
    expect(label).toBeInTheDocument();
    if (curVal === value) expect(radio.getAttribute('checked')).not.toBeNull();
  }
});
