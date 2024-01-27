import Link from "next/link";
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black py-20 text-white">
      <div className="mb-20"></div>
      <div className="container mx-auto px-4">
        <Link href="/" className="font-black text-tertiary-dark">
          PALECODE
        </Link>

        <h4 className="font-semibold text-[40px] py-6">Contact</h4>

        <div className="flex flex-wrap gap-16 items-center justify-between">
          <div className="flex-1">
            <p>Quilmes Oeste</p>
            <div className="flex items-center py-4">
              <BsFillSendFill />
              <p className="ml-2">juliansoto.dev@gmail.com</p>
            </div>
            <div className="flex items-center">
              <BsTelephoneOutbound />
              <p className="ml-2">+5491130666369</p>
            </div>
            <div className="flex items-center pt-4">
              <FaLinkedinIn />
              <p className="ml-2">
                https://www.linkedin.com/in/full-stack-julian-soto/
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-tertiary-light h-10 md:h-[70px] w-full" />
    </footer>
  );
};

export default Footer;
