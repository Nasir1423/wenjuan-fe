import type { Meta, StoryObj } from '@storybook/react';
import QuestionInput from '@/components/QuestionComponents/QuestionInput';

const meta = {
  title: 'Question/QuestionInput',
  component: QuestionInput,
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SetProps: Story = {
  args: {
    text: '个人评价',
    placeholder: '请进行自我评价...',
  },
};
