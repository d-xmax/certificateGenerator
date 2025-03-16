import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';

import axios from 'axios';

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [selectTemplate, setSelectTemplate] =
    useState('');
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
      <h2 className="font-bold text-4xl text-center my-11">
        Pick Your Template to Generate Your Poster
      </h2>
      <div className="grid gap-4 grid-cols-2  lg:grid-cols-3">
        {templates.length > 0 ? (
          templates.map((template, i) => (
            <Card 
            key={i}
            onClick={()=>{setSelectTemplate(template)}}
            className={``}
             >
              <img
                alt={template} 
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
