import { useForm } from 'react-hook-form';
import { User } from '../types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupSchema } from '../utils/yupSchems';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { convertToBase64 } from '../utils/utils';
import { updateUncontrolledData } from '../store/sliceFormData';
import { useNavigate } from 'react-router';

export default function ControlledForm() {
  const countries = useAppSelector((state) => state.countries);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>({ resolver: yupResolver(yupSchema) });
  const onSubmit = async (data: User) => {
    let imgBase64 = null;
    if (data.img && data.img instanceof FileList && data.img.length > 0) {
      imgBase64 = await convertToBase64(data.img[0]);
    }

    dispatch(updateUncontrolledData({ ...data, img: imgBase64 }));
    navigate('/');
  };
  watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div></div>
      <label>
        Name: <input {...register('name')} type="text" />
      </label>
      {<span className="error">{errors.name?.message || ''}</span>}
      <label>
        Age: <input {...register('age')} type="number" defaultValue={0} />
      </label>
      {<span className="error">{errors.age?.message || ''}</span>}
      <label>
        Email: <input {...register('email')} type="email" />
      </label>
      {<span className="error">{errors.email?.message || ''}</span>}
      <label>
        Password:
        <input {...register('password')} type="password" autoComplete="" />
      </label>
      {<span className="error">{errors.password?.message || ''}</span>}
      <label>
        Confirm password:
        <input
          {...register('confirmPassword')}
          type="password"
          autoComplete=""
        />
      </label>
      {<span className="error">{errors.confirmPassword?.message || ''}</span>}
      <label>
        Gender:
        <label>
          <input {...register('gender')} type="radio" value="Male" /> Male
        </label>
        <label>
          <input {...register('gender')} type="radio" value="Family" /> Family
        </label>
      </label>
      {<span className="error">{errors.gender?.message || ''}</span>}
      <label>
        Term condition:
        <input {...register('termCondition')} type="checkbox" value="ok" />
      </label>
      {<span className="error">{errors.termCondition?.message || ''}</span>}
      <label>
        Image:
        <input {...register('img')} type="file" accept=".jpg, .png, .jpeg" />
      </label>
      {<span className="error">{errors.img?.message || ''}</span>}
      <label>
        Country:
        <select {...register('country')}>
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
