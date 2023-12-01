export default function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="[ body-text ] opacity-50 capitalize  hover:text-primary mb-[2.4rem] hover:opacity-100 lg:mb-[5.6rem]"
      onClick={onClick}
    >
      go back
    </button>
  );
}
