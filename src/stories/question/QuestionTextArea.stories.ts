import type { Meta, StoryObj } from '@storybook/react';
import QuestionTextArea from '@/components/QuestionComponents/QuestionTextArea';

const meta = {
  title: 'Question/QuestionTextArea',
  component: QuestionTextArea,
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SetProps: Story = {
  args: {
    title: '过往经历',
    text: '请从多个角度描述',
  },
};
