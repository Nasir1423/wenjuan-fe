import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { FC } from 'react';
import ComponentLib from './ComponentLib';
import Layers from './Layers';

const LeftPanel: FC = () => {
  /* const items = [AppstoreOutlined, BarsOutlined].map((Icon, index) => {
    const id = String(index + 1);
    
  }); */
  const tabItems = [
    {
      key: 'componentLib',
      label: '组件库',
      children: <ComponentLib />,
      icon: <AppstoreOutlined />,
    },
    {
      key: 'layers',
      label: '图层',
      children: <Layers />,
      icon: <BarsOutlined />,
    },
  ];
  return <Tabs defaultActiveKey="componentLib" items={tabItems} />;
};

export default LeftPanel;
