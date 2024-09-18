import React, {FC, PropsWithChildren} from 'react';
import { IoInformation } from 'react-icons/io5';

const Info: FC<PropsWithChildren> = ({children}) => {
  return (
    <section className='relative flex flex-col w-full rounded px-3 py-0 my-4 border border-blue-500 prose-p:m-2'>
      {children}
      <div className='absolute flex justify-center items-center bg-blue-500 rounded-full w-7 h-7 top-0 left-0 -translate-x-1/2 -translate-y-1/2'>
        <IoInformation className='text-white text-xl' />
      </div>
    </section>
  );
};

export default Info;
