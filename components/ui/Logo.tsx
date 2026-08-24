import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

type LogoProps = {
  row?: boolean;
  className?: string;
  animated?: boolean;
};

export function Logo({ className, row, animated }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Beland — volver al inicio"
      className={cn(
        "items-center font-semibold flex",
        row ? "flex-row" : "flex-col",
        className,
      )}
    >
      <Image
        src={"/beland.png"}
        alt="Logo de Beland"
        width={100}
        height={100}
        className={cn(animated && "animate-logo-bounce")}
      />
      <span className="text-[13px] font-black uppercase text-orange-500">
        Beland
      </span>
    </Link>
  );
}
