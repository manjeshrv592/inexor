import Image from "next/image";

const Logo = () => {
  return (
    <div className="xxl:p-5 border-b border-neutral-800 bg-[#050505] p-3 pb-6 xl:border-none">
      <Image
        src="/logo.svg"
        alt="Inexor logo"
        height={10}
        width={10}
        className="mx-auto h-auto w-20 xl:w-full"
        priority
      />
    </div>
  );
};

export default Logo;
