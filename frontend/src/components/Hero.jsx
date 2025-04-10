import React from 'react';
import { Button } from './ui/button';
import { CircleCheckBig } from 'lucide-react';

function Hero() {
  return (
    <div className='mb-11'>
      <h1 className="font-bold tracking-tight text-5xl md:text-6xl mb-10">
        Generate your poster easily
      </h1>
       
        <p className="text-gray-600 text-xl">
          Create & customize your poster with our
          elegant templates.
        </p>
        <p className="text-gray-600 text-xl">
          You can easily download in PDF and print
          it anytime.
        </p>
      
      <Button className="text-xl mt-9 mb-3 py-6 bg-emerald-600">
        Generate a Poster Now
      </Button>

      <p className="flex justify-center gap-1">
        <CircleCheckBig
          color="#008000"
          strokeWidth={2.5}
          fillOpacity={0.2}
        />
        <span className="font-semibold tracking-tight">
          100% Free Download in PDF
        </span>
      </p>
    </div>
  );
}

export default Hero;
