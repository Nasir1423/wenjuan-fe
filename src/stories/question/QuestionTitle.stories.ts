import type { Meta, StoryObj } from '@storybook/react';
import QuestionTitle from '@/components/QuestionComponents/QuestionTitle';

const meta = {
  title: 'Question/QuestionTitle',
  component: QuestionTitle,
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SetProps: Story = {
  args: {
    text: '个人信息收集',
    level: 1,
    alignCenter: true,
  },
};
