import React from 'react';

function StepSection() {
  return (
    <div className="max-h-screen bg-black py-14 px-8 text-slate-50">
      <div className='mb-4'>
        <h2 className="font-bold text-5xl mb-4 md:text-4xl">
          Pick a template
        </h2>
        Select a template design you like from our templates. 
      </div>
      <div className='mb-4'>
        <h2 className="font-bold text-5xl mb-4 md:text-4xl">
          Fill the form 
        </h2>
        Add the name, date, photo and other details
      </div>
      <div className='mb-4'>
        <h2 className="font-bold text-5xl mb-4 md:text-4xl">
          Download Instantly
        </h2>
        Your poster is ready to download in high-quality printable PDF format.
      </div>
    </div>
  );
}

export default StepSection;
