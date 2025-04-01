'use client';
import ConsultantCard from '@/components/ConsultantCard';
import HSTitle from '@/components/HSTitle';
import { Flex } from 'antd';

export default function ChoosePage() {
  const consultants = [
    {
      name: '张三',
      avatar: '/avatar.png',
      rate: 4.5,
      intro: '精神科医生，擅长心理疾病的诊断和治疗。',
      isIdle: true,
    },
  ];
  return (
    <div>
      {/* 标题 */}
      <HSTitle title="选择咨询师" canBack />
      {/* 咨询师 */}
      <div className="w-full px-5">
        {/* 卡片列表 */}
        <Flex vertical gap={8}>
          {consultants.map(({ isIdle }, index) => (
            <ConsultantCard isIdle={isIdle} key={index} />
          ))}
        </Flex>
      </div>
    </div>
  );
}
