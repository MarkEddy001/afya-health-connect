
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-4 text-center text-sm text-gray-600 mt-auto">
      © {new Date().getFullYear()} Mark Edwards
    </footer>
  );
};

export default Footer;
