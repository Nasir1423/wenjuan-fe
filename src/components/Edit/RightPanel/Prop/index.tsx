import { getPropComponentByInfo } from '@/components/QuestionComponents';
import useGetComponentsData from '@/hooks/useGetComponentsData';
import { FC } from 'react';

const Prop: FC = () => {
  const { selectedComponent: selectedComponentInfo } = useGetComponentsData();

  return <div>{selectedComponentInfo && getPropComponentByInfo(selectedComponentInfo)}</div>;
};

export default Prop;
