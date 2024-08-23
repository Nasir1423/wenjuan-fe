import { FC } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export type PropsType = {
  stat: Array<{ name: string; count: number }>;
};

// 多选框 - 柱状图
const CheckboxStatComponent: FC<PropsType> = (props: PropsType) => {
  const { stat } = props;
  return (
    <div
      style={{
        width: '80%',
        height: '50%',
        margin: '30px',
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={400}
          height={300}
          data={stat}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="count" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CheckboxStatComponent;
