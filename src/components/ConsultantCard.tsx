import { Rate, Space } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ConsultantCard({ isIdle }: { isIdle: boolean }) {
  const router = useRouter();

  return (
    <div className="rounded-xl px-3 py-4 bg-white">
      <div className="mb-4 flex h-16 gap-4">
        <Image
          className="rounded-full border-blackFifth border"
          src="/avatar.svg"
          alt="avatar"
          width={64}
          height={64}
        />
        <div className="h-full flex flex-col justify-around">
          {/* 咨询师 */}
          <Space>
            <Image
              src="/consultant.svg"
              alt="consultant"
              width={24}
              height={24}
            />
            <p>咨询师</p>
          </Space>
          {/* 咨询时间 */}
          <Space>
            <Image src="/time.svg" alt="time" width={24} height={24} />
            <p>空闲</p>
          </Space>
        </div>
      </div>
      {/* 我的评价 */}
      <Space size="middle" className="mb-3">
        <p>综合评价</p>
        <Rate disabled defaultValue={2} />
      </Space>
      {/* 按钮组 */}
      <div className="flex justify-end gap-2">
        {!isIdle && (
          <button className="border border-blackFourth rounded-full px-4 leading-6 text-blackSecond">
            开始排队
          </button>
        )}
        <button
          onClick={() => router.push('/chat/1')}
          className={`${
            isIdle ? 'bg-themeGreen' : 'bg-blackFourth'
          } text-white rounded-full px-4 leading-6 font-semibold`}
          disabled={!isIdle}>
          立即咨询
        </button>
      </div>
    </div>
  );
}
