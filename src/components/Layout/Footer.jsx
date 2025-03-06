function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-2 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {currentYear} TodoApp. Made by Nishant.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
