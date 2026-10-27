import Image from "next/image";
import logo from "@/public/mitran-global-logo.png";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`inline-flex shrink-0 items-center ${className}`} aria-label="MiTran Global, back to top">
      <Image src={logo} alt="MiTran Global" priority className="h-11 w-auto sm:h-12" sizes="200px" />
    </a>
  );
}
