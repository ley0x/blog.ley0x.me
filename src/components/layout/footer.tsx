import { FC } from "react";

const Footer: FC = () => {
  const getYear = () => {
    const date = new Date();
    return date.getFullYear();
  };
  return (
    <footer className='flex flex-col gap-y-3 bg-accent py-4 text-center font-semibold'>
      <p className='max-w-lg mx-auto'>Thank you for reading.</p>
      <p className=''>© {getYear()} ley0x</p>
      <a rel="me" href="https://infosec.exchange/@ley0x">Mastodon</a>
    </footer>
  );
};

export default Footer;
