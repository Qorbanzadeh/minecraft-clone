function MenuButton({
  onClick,
  children,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      tabIndex={-1}
      className={`w-1/2 sm:w-1/4 text-neutral-950 bg-neutral-100 bg-opacity-90 border border-neutral-950 shadow-2xl  ${
        disabled ? "text-opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled || false}
    >
      {children}
    </button>
  );
}

export default MenuButton;
