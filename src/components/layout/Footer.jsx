function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} PokeMarket. All rights reserved.
        </p>
        <p className="text-sm">Built with ❤️ using React and Tailwind CSS.</p>
      </div>
    </footer>
  );
}

export default Footer;
