import type { Meta, StoryObj } from '@storybook/react';
import QuestionRadio from '@/components/QuestionComponents/QuestionRadio';

const meta = {
  title: 'Question/QuestionRadio',
  component: QuestionRadio,
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SetProps: Story = {
  args: {
    title: '性别',
    options: [
      {
        value: 'male',
        text: '男',
      },
      {
        value: 'female',
        text: '女',
      },
    ],
    value: '',
    isVertical: true,
  },
};
