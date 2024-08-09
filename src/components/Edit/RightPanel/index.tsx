import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { FC } from 'react';
import Prop from './Prop';
import Setting from './Setting';

const RightPanel: FC = () => {
  /* const items = [AppstoreOutlined, BarsOutlined].map((Icon, index) => {
    const id = String(index + 1);
    
  }); */
  const tabItems = [
    {
      key: 'prop',
      label: '属性',
      children: <Prop />,
      icon: <FileTextOutlined />,
    },
    {
      key: 'setting',
      label: '页面设置',
      children: <Setting />,
      icon: <SettingOutlined />,
    },
  ];
  return <Tabs defaultActiveKey="prop" items={tabItems} />;
};

export default RightPanel;
