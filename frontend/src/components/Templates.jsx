import { useContext, useEffect, useState } from 'react';
import { Card } from './ui/card';

import axios from 'axios';
import { certificateContext } from '@/store/CertificateContext';

function Templates() {
  const [templates, setTemplates] = useState([]);
   const {selectTemplate, setSelectTemplate} = useContext(certificateContext)
   
   useEffect(() => {
    axios
      .get('http://localhost:5000/api/templates')
      .then((res) => {
        setTemplates(res.data);
      
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h2 className="font-bold md:text-5xl text-4xl text-center mt-11 mb-4">
        Pick Your Template to Generate Your Poster
      </h2>
      <p className='text-lg mb-11 text-gray-600 md:px-16'>Select the template, enter your details and hit Generate Certificate to download your poster </p>
      <div className="grid gap-4 grid-cols-2 max-w-lg lg:grid-cols-3 place-self-center shadow-xl">
        {templates.length > 0 ? (
          templates.map((template, i) => (
            <Card 
            key={i}
            onClick={()=>{setSelectTemplate(template)}}
            className={` border-red-400`}
             >
              <img
                alt={template} 
                
                className='w-full overflow-hidden '
                src={`http://localhost:5000/templates/${template}`}
              />
            </Card>
          ))
        ) : (
          <p>Loading Templates</p>
        )}
      </div>
    </div>
  );
}

export default Templates;
