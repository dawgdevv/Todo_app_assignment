function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  fullWidth = false,
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
    danger:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
  };

  const sizes = {
    sm: "text-xs px-2.5 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
