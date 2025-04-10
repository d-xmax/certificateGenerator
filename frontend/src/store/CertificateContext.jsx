import { createContext, useState } from 'react';

export const certificateContext = createContext({
  selectTemplate: {},
  setSelectTemplate: {},
  updateFormField: () => {},
  setFormData: {},
  formData: {},
  image: {},
  setOtherDetails:{},
  otherDetails:{},
  handleImageChange: () => {},
  setLoading: {},
  loading: {},
});

function CertificateContextProvider({
  children,
}) {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    dod: '',
  });

  const [selectTemplate, setSelectTemplate] =
    useState(null);
  const [image, setImage] = useState(null);
  const [otherDetails, setOtherDetails] =
    useState();
  const [loading, setLoading] = useState(false);

  // Form data(input) setting
  const updateFormField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // image setting
  const handleImageChange = (file) => {
    setImage(file);
  };

 

  const ctxValue = {
    setFormData,
    formData,
    setSelectTemplate,
    image,
    selectTemplate,
    updateFormField,
    handleImageChange,
    setOtherDetails,
    otherDetails,
    setLoading,
    loading,
  };

  console.log(selectTemplate, formData);

  return (
    <certificateContext.Provider value={ctxValue}>
      {children}
    </certificateContext.Provider>
  );
}

export default CertificateContextProvider;
