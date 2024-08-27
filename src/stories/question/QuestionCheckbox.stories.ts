import type { Meta, StoryObj } from '@storybook/react';
import QuestionCheckbox from '@/components/QuestionComponents/QuestionCheckbox';

const meta = {
  title: 'Question/QuestionCheckbox',
  component: QuestionCheckbox,
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SetProps: Story = {
  args: {
    title: '编程语言',
    isVertical: false,
    list: [
      { value: 'c', text: 'c', checked: true },
      { value: 'cpp', text: 'c++', checked: true },
      { value: 'py', text: 'python', checked: false },
    ],
  },
};
