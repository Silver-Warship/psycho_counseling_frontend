'use client';
import useChat from '@/hooks/useChat/useChat';
import { LeftOutlined, SendOutlined } from '@ant-design/icons';
import { ConfigProvider, Flex, Form, Input, Space } from 'antd';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function ChatPage() {
  const [form] = Form.useForm();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      // chatContainerRef.current.scrollTo(
      //   0,
      //   chatContainerRef.current.scrollHeight
      // );
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { webSocket, isConnected, sendMsg, requestMsg, messageList } = useChat({
    url: 'ws://172.30.198.106:8080/chat',
    onOpen: () => {
      console.log('ws已连接');
    },
    onClose: () => {
      console.log('ws已关闭');
    },
    onMessage: (message) => {
      console.log('收到消息:', message);
    },
    sessionID: 123,
    userID: 1234,
    receiverID: 1,
  });

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  // 轮询请求最新消息
  useEffect(() => {
    // 输出蓝色背景的log
    console.log(
      '%c开始轮询', // Console Message
      'color: blue'
    );
    const intervalId = setInterval(() => {
      console.log(
        '%c请求最新消息', // Console Message
        'color: red'
      );
      requestMsg();
    }, 5000);

    // 返回一个清除函数，在组件卸载时清除定时器
    return () => {
      clearInterval(intervalId);
      webSocket?.close();
    };
  }, []); // 依赖于sendMessage，确保如果sendMessage变化，定时器会重新创建

  const onClickSend = () => {
    const value = form.getFieldValue('content');
    console.log(value);
    if (value) {
      sendMsg({
        content: value,
        contentType: 'TEXT',
      });
      form.resetFields();
      scrollToBottom();
    }
  };

  return (
    <div>
      {/* 头部 */}
      <div className="bg-white w-full h-16 px-5 flex items-center justify-between">
        <Space size={'middle'}>
          <LeftOutlined />
          <div className="flex flex-col">
            <p className="text-blackFist text-lg">咨询师</p>
            <p className="text-blackSecond text-sm">extra info here</p>
          </div>
        </Space>
        <Image src="/exit.svg" alt="exit" width={28} height={28} />
      </div>
      {/* chat */}
      <div
        ref={chatContainerRef}
        style={{ height: 'calc(100vh - 128px)' }}
        className="w-full bg-gray-background overflow-y-auto">
        <Flex vertical>
          {messageList.map(({ messageID: id, role, content, seq }) =>
            role ? (
              <div key={id ?? seq} className="w-full p-3 pl-[72px]">
                <Flex gap="small" justify="flex-end" align="flex-start">
                  <div className="bg-chat-bg p-3 rounded-md">
                    <p className="leading-6 text-blackFist">{content}</p>
                  </div>
                  <Image
                    className="rounded-full flex-shrink-0"
                    src="/avatar.svg"
                    alt="avatar"
                    width={44}
                    height={44}
                  />
                </Flex>
              </div>
            ) : (
              <div key={id} className="w-full p-3 pr-[72px]">
                <Flex gap="small" align="flex-start">
                  <Image
                    className="rounded-full flex-shrink-0"
                    src="/avatar.svg"
                    alt="avatar"
                    width={44}
                    height={44}
                  />
                  <div className="bg-white p-3 rounded-md">
                    <p className="leading-6 text-blackFist">{content}</p>
                  </div>
                </Flex>
              </div>
            )
          )}
        </Flex>
      </div>
      {/* input */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-16 bg-[#F9F9F9] border-t border-blackFifth flex items-center gap-2 px-3">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#C3E006',
            },
            components: {
              Input: {
                activeBorderColor: '#E1FB7A',
                hoverBorderColor: '#A1C903',
              },
              Button: {},
            },
          }}>
          <Image src="/voice.svg" alt="voice" width={28} height={28} />
          <Form
            className="flex w-full gap-2"
            form={form}
            wrapperCol={{ span: 24 }}>
            <div className="flex-1 items-center justify-center">
              <Form.Item
                name="content"
                style={{ margin: 0 }}
                className="flex-1">
                <Input size="large" placeholder="输入消息" />
              </Form.Item>
            </div>
            <button
              onClick={onClickSend}
              className="flex-shrink-0 w-10 h-10 bg-themeGreen rounded-full flex items-center justify-center">
              <SendOutlined style={{ color: '#fff' }} />
            </button>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
}
