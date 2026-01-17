"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UiLink({ href, children, ...props }: any) {
  //const { setGlobalWaiting } = useThemeContext();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    if(props.onClick){
      props.onClick(e);
    }
    if(href!==pathname){
      // setGlobalWaiting("ROUTING", true);
    }
    else{
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}