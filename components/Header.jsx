import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-primaryColor h-[4.8rem] flex items-center px-[6.25rem]"> 
      <Image src="/logo.svg" alt="logo" width={150} height={32} />
    </header>
  );
}
