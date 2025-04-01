'use client';
import Image from 'next/image';
import { Divider, Flex, Space } from 'antd';
import { useRouter } from 'next/navigation';
import ConsultRecordCard from '@/components/ConsultRecordCard';
import HSTitle from '@/components/HSTitle';

export default function Home() {
  const router = useRouter();

  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    //     <Image
    //       className="dark:invert"
    //       src="/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
    //       <li className="mb-2">
    //         Get started by editing{" "}
    //         <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
    //           src/app/page.tsx
    //         </code>
    //         .
    //       </li>
    //       <li>Save and see your changes instantly.</li>
    //     </ol>

    //     <div className="flex gap-4 items-center flex-col sm:flex-row">
    //       <a
    //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className="dark:invert"
    //           src="/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //   </main>
    //   <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>

    <div>
      {/* 标题 */}
      <HSTitle title="花狮心途" />
      {/* 用户信息 */}
      <div className="w-full px-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            className="rounded-full"
            src="/avatar.svg"
            alt="avatar"
            width={80}
            height={80}
          />
          <div>
            <p className="text-blackFist text-lg mb-1">用户001</p>
            <p className="text-blackSecond text-sm">123****4567</p>
          </div>
        </div>
        <Image src="/edit.svg" alt="edit" width={24} height={24} />
      </div>
      {/* 按钮 */}
      <div className="flex justify-center w-full my-5">
        <button
          className="hover:bg-themeGreen-dark active:bg-themeGreen-dark bg-themeGreen w-[238px] h-12 rounded-full flex items-center justify-center"
          onClick={() => {
            router.push('/choose');
          }}>
          <Space>
            <Image src="/counsel.svg" alt="counsel" width={24} height={24} />
            <p className="text-white text-lg font-bold">立即开始咨询</p>
          </Space>
        </button>
      </div>
      <div className="px-5 my-3">
        <Divider />
      </div>
      {/* 咨询记录 */}
      <div className="w-full px-5">
        {/* header */}
        <div className="mb-4 flex justify-between items-center">
          <p>咨询记录</p>
          <Space>
            <Image src="/filter.svg" alt="filter" width={24} height={24} />
            <p className="text-blackSecond">筛选</p>
          </Space>
        </div>
        {/* 卡片列表 */}
        <Flex vertical gap={8}>
          {[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}].map((item, index) => (
            <ConsultRecordCard key={index} />
          ))}
        </Flex>
      </div>
    </div>
  );
}
