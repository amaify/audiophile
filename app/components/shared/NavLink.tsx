import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavigationLInks {
  name: "home" | "headphones" | "speakers" | "earphones";
  href: "/" | "/headphones" | "/speakers" | "/earphones";
}

export const navLinks: NavigationLInks[] = [
  { name: "home", href: "/" },
  { name: "headphones", href: "/headphones" },
  { name: "speakers", href: "/speakers" },
  { name: "earphones", href: "/earphones" }
];

interface Props {
  isFooter?: boolean;
}

const NavigationLinks = ({ isFooter }: Props) => {
  const router = useRouter();
  const pathName = router.asPath;

  return (
    <nav
      className={clsx(
        "flex flex-col items-center gap-[1.6rem] flex-wrap sm:flex-row lg:gap-[3.4rem]",
        !isFooter && "md:mr-auto",
        isFooter && "mt-[4.8rem] sm:mt-[3.2rem] lg:mt-0"
      )}
    >
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={`${link.href}`}
          className={clsx("[ nav-link ] hover:cursor-pointer", pathName.includes(link.name) && "[ nav-link-active ]")}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavigationLinks;
