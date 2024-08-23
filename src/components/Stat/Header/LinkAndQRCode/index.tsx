import { CopyOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, message, Popover, QRCode, Space, Tooltip } from 'antd';
import { FC, useRef } from 'react';
import { useParams } from 'react-router-dom';

const LinkAndQRCode: FC = () => {
  const { id = '' } = useParams();
  const urlInputRef = useRef<InputRef>(null);

  // 将 urlInput 中的内容复制到剪贴板
  const copyToClipboard = () => {
    // 第一种实现方式
    // const inputElem = urlInputRef.current;
    // if (!inputElem) return;
    // inputElem.select(); // 选中 input 元素中的全部文本内容。
    // document.execCommand('copy'); // 将选中的内容复制到剪贴板。
    // inputElem.blur(); // 使 input 元素失去焦点。
    // message.success('拷贝成功');

    // 第二种实现方式
    if (!urlInputRef.current) return;
    if (!urlInputRef.current.input) return;
    const textToCopy = urlInputRef.current.input.value;

    navigator.clipboard
      .writeText(textToCopy) // 将 input 的内容复制到剪贴板。
      .then(() => {
        message.success('拷贝成功');
      })
      .catch(() => {
        message.error('拷贝失败');
      });
  };

  // 拼接 url，其需要参考 C 端的规则
  const url = `http://localhost:3000/question/${id}`;

  // 二维码，根据 url 生成相应的二维码
  const QRCodeElem = (
    <div style={{ textAlign: 'center' }}>
      <QRCode value={url}></QRCode>
    </div>
  );

  return (
    <Space>
      {/* url */}
      <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
      {/* 拷贝 url */}
      <Tooltip title="拷贝链接">
        <Button icon={<CopyOutlined />} onClick={copyToClipboard} />
      </Tooltip>
      {/* url 对应的二维码 */}
      <Popover content={QRCodeElem}>
        <Button icon={<QrcodeOutlined />} />
      </Popover>
    </Space>
  );
};

export default LinkAndQRCode;
