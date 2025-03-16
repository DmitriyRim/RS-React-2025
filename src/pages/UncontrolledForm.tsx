import { useState } from 'react';
import { yupSchema } from '../utils/yupSchems';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateUncontrolledData } from '../store/sliceFormData';
import { User } from '../types/types';
import { convertToBase64 } from '../utils/utils';
import { useNavigate } from 'react-router';

export default function UncontrolledForm() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const countries = useAppSelector((state) => state.countries);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    const file = formData.get('img') as File | null;
    const imgBase64 =
      file && file.size > 0 ? await convertToBase64(file) : null;

    const result = {
      name: formData.get('name'),
      age: formData.get('age'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      gender: formData.get('gender'),
      termCondition: formData.get('termCondition'),
      img: formData.get('img'),
      country: formData.get('country'),
    };

    try {
      await yupSchema.validate(result, { abortEarly: false });
      setErrors({});
      dispatch(
        updateUncontrolledData({
          ...result,
          img: imgBase64,
          age: Number(result.age),
        } as unknown as User)
      );
      navigate('/');
    } catch (err) {
      const newErrors: {
        [key: string]: string;
      } = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
      }
      setErrors(newErrors);
    }
  };

  return (
    <form action={handleSubmit} className="form">
      <div></div>
      <label>
        Name: <input name="name" type="text" />
      </label>
      {<span className="error">{errors.name || ''}</span>}
      <label>
        Age: <input name="age" type="number" defaultValue={0} />
      </label>
      {<span className="error">{errors.age || ''}</span>}
      <label>
        Email: <input name="email" type="email" />
      </label>
      {<span className="error">{errors.email || ''}</span>}
      <label>
        Password:
        <input name="password" type="password" autoComplete="" />
      </label>
      {<span className="error">{errors.password || ''}</span>}
      <label>
        Confirm password:
        <input name="confirmPassword" type="password" autoComplete="" />
      </label>
      {<span className="error">{errors.confirmPassword || ''}</span>}
      <label>
        Gender:
        <label>
          <input name="gender" type="radio" value="Male" /> Male
        </label>
        <label>
          <input name="gender" type="radio" value="Family" /> Family
        </label>
      </label>
      {<span className="error">{errors.gender || ''}</span>}
      <label>
        Term condition:
        <input name="termCondition" type="checkbox" value="ok" />
      </label>
      {<span className="error">{errors.termCondition || ''}</span>}
      <label>
        Image:
        <input name="img" type="file" accept=".jpg, .png, .jpeg" />
      </label>
      {<span className="error">{errors.img || ''}</span>}
      <label>
        Country:
        <select name="country">
          {countries.map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>
      </label>

      <input type="submit" value="Submit" />
    </form>
  );
}
