import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="[ body-text ] opacity-50 capitalize  hover:text-primary mb-[2.4rem] hover:opacity-100 md:mb-[5.6rem]"
      onClick={() => router.back()}
    >
      go back
    </button>
  );
}
