import type { Meta, StoryObj } from '@storybook/react';
import QuestionParagraph from '@/components/QuestionComponents/QuestionParagraph';

const meta = {
  title: 'Question/QuestionParagraph',
  component: QuestionParagraph,
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionParagraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SetProps: Story = {
  args: {
    text: '悟已往之不谏知来者之可追',
    isCenter: true,
  },
};
