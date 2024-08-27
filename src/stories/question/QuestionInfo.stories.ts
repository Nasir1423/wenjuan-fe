import type { Meta, StoryObj } from '@storybook/react';
import QuestionInfo from '@/components/QuestionComponents/QuestionInfo';

const meta = {
  title: 'Question/QuestionInfo',
  component: QuestionInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionInfo>; // ts 中 typeof 返回的是类型

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SetProps: Story = {
  args: {
    title: '我是问卷标题',
    desc: '我是问卷描述',
  },
};

export const DescBreakLine: Story = {
  args: {
    title: 'hello',
    desc: 'world\nworld\nworld',
  },
};
