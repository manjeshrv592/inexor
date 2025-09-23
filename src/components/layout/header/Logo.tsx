import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="border-b border-neutral-800 bg-[#050505] p-3 pb-6 lg:border-none lg:bg-transparent lg:p-1 lg:pt-4">
      <Link href="/" className="block">
        <Image
          src="/logo.svg"
          alt="Inexor logo"
          height={10}
          width={10}
          className="mx-auto h-auto w-20 xl:w-full"
          priority
        />
      </Link>
    </div>
  );
};

export default Logo;
