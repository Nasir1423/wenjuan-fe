import { FC, useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export type PropsType = {
  stat: Array<{ name: string; count: number }>;
};

const RadioStatComponent: FC<PropsType> = (props: PropsType) => {
  const { stat } = props;
  const COLORS = useMemo(() => ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'], []);
  const statSum = useMemo(
    () => stat.reduce((accumulator, current) => accumulator + current.count, 0),
    [stat]
  );
  return (
    <div
      style={{
        width: '80%',
        height: '50%',
        margin: '30px',
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="count"
            isAnimationActive={false}
            data={stat}
            cx="50%" // x 轴便宜
            cy="50%" // y 轴偏移
            outerRadius={50} // 直径
            fill="#8884d8"
            label={item => `${item.name}: ${(100 * (item.count / statSum)).toFixed(2)}`}
          >
            {stat.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadioStatComponent;
