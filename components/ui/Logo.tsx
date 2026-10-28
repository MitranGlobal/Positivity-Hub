import Image from "next/image";
import logo from "@/public/mitran-global-logo.png";
import logoLight from "@/public/mitran-global-logo-light.png";

/** MiTran Global logo. Use `onDark` on black surfaces (gold + ivory version). */
export default function Logo({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <a href="#top" className={`inline-flex shrink-0 items-center ${className}`} aria-label="MiTran Global, back to top">
      <Image src={onDark ? logoLight : logo} alt="MiTran Global" priority className="h-11 w-auto sm:h-12" sizes="200px" />
    </a>
  );
}
