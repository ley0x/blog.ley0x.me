import React, {FC, PropsWithChildren} from 'react';
import { IoBulb } from 'react-icons/io5';

const Tip: FC<PropsWithChildren> = ({children}) => {
  return (
    <section className='relative flex flex-col w-full rounded px-3 py-0 my-4 border border-yellow-600 prose-p:m-2'>
      {children}
      <div className='absolute flex justify-center items-center bg-yellow-600 rounded-full w-6 h-6 top-0 left-0 -translate-x-1/2 -translate-y-1/2'>
        <IoBulb className='text-md text-white'/>
      </div>
    </section>
  );
};

export default Tip;
