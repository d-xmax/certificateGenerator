import React, { useContext, useEffect } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { certificateContext } from '@/store/CertificateContext';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'

function Form() { 
  const { updateFormField, handleImageChange, setOtherDetails } =
  useContext(certificateContext);
  const modules = {

      toolbar:[
        [{header: [1, 2 ,3 , false]}],
        [{'align':[]}],
        ['bold', 'italic', 'underline'],
        [{list: 'ordered'}, {list: 'bullet'}],
        ['link'],
        ['clean']
      ]
    }
    const { quill, quillRef } = useQuill({modules: modules });
    useEffect(()=>{
      if(quill){
        quill.on('text-change', ()=>{
          setOtherDetails(quill.root.innerHTML);
          
        })
      
      }
    },[quill])

  const handleChange = (e) => {
    updateFormField(
      e.target.name,
      e.target.value
    );
    
  };

  return (
    <>
      <div className="p-4 max-w-lg mx-auto">
        <form className="space-y-4">
          <div className='grid w-full gap-1.5'>
            <Label
              htmlFor="name"
              className="flex text-xl"
            >
              Name
            </Label>
            <Input
              id="name"
              type="name"
              name="name"
              placeholder="Enter your Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className='grid w-full gap-1.5'>
            <Label
              htmlFor="dob"
              className="flex text-xl"
            >
              Date of birth
            </Label>
            <Input
              id="dob"
              type="date"
              
              name="dob"
              onChange={handleChange}
              required
            />
          </div>
          <div className='grid w-full gap-1.5'>
            <Label
              htmlFor="dod"
              className="flex text-xl"
            >
              Date of dead
            </Label>
            <Input
              id="dod"
              type="date"
              name="dod"
              onChange={handleChange}
            />
          </div>
          <div className='grid w-full gap-1.5'>
            <Label
              htmlFor="image"
              className="flex text-xl"
            >
              Add your image
            </Label>
            <Input
              id="image"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) =>
                handleImageChange(
                  e.target.files[0]
                )
              }
            />
          </div>
          <div className='grid w-full gap-1.5'>
            <Label
              htmlFor="otherDetails"
              className="flex text-xl"
            >
              Add your other details
            </Label>
            
              <div id='otherDetails' ref={quillRef} className='border-gray-600 rounded-md min-h-60 '>

              </div>
             
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
