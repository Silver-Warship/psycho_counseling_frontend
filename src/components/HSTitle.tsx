import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HSTitle({
  title,
  canBack = false,
}: {
  title: string;
  canBack?: boolean;
}) {
  const router = useRouter();

  return (
    <div className="relative w-full text-center pt-6 pb-4 mb-6">
      {canBack && (
        <Image
          className="absolute left-4 top-4 cursor-pointer"
          src="/back.svg"
          width={24}
          height={24}
          alt="back"
          onClick={() => router.back()}
        />
      )}
      <h2 className="text-xl">{title}</h2>
    </div>
  );
}
