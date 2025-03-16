import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
 

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    dod: '',
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        'http://localhost:5000/api/certificate/generate',
        formData
      )

      .then((res) => {
        console.log(
          `response from server : ${res.data.message}`
        );
      })
      .catch((err) => {
        console.log(
          err.response?.data?.err ||
            'An error occurred'
        );
      })
      .finally(() => {
        setLoading(false);
      });
      
  };

  return (
    <>
      <div className="p-4 max-w-lg mx-auto">
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
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
          <div>
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
          <div>
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
          <div>
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
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? 'Generating..'
              : 'Generate'}
          </Button>
        </form>
      </div>
    </>
  );
}

export default Form;
