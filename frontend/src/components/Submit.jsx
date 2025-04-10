import React, { useContext } from 'react';
import axios from 'axios';
import { certificateContext } from '@/store/CertificateContext';
import { Button } from './ui/button';
import { object } from 'zod';
function Submit() {
  const {
    selectTemplate,
    formData,
    image,
    otherDetails,
    setLoading,
    loading,
  } = useContext(certificateContext);

  const handleDataSend = () => {
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).map((key) =>
      data.append(key, formData[key])
    );

    // Add image
    data.append('image', image);

    // Add other details

    data.append('otherDetails', otherDetails)

    // Add template
    data.append('template', selectTemplate);
    Array.from(
      data
        .entries()
        .map(([key, value]) =>
          console.log(key, value)
        )
    );
    axios
      .post(
        'http://localhost:5000/api/certificate/generate',
        data
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Button
      onClick={handleDataSend}
      disabled={
        loading ||
        !selectTemplate ||
        !formData.name ||
        !formData.dob ||
        !formData.dod ||
        !image
      }
    >
      Generate Certificate
    </Button>
  );
}

export default Submit;
