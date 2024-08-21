import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { FC, useEffect, useState } from 'react';
import Prop from './Prop';
import Setting from './Setting';
import useGetComponentsData from '@/hooks/useGetComponentsData';

enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);
  const { selectedId } = useGetComponentsData();

  useEffect(() => {
    selectedId ? setActiveKey(TAB_KEYS.PROP_KEY) : setActiveKey(TAB_KEYS.SETTING_KEY);
  }, [selectedId]);

  const tabItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: '属性',
      children: <Prop />,
      icon: <FileTextOutlined />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: '页面设置',
      children: <Setting />,
      icon: <SettingOutlined />,
    },
  ];
  return <Tabs activeKey={activeKey} items={tabItems} />;
};

export default RightPanel;
