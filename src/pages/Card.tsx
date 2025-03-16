import { User } from '../types/types';

interface Props {
  data: User[];
  title: string;
}

export default function Card({ data, title }: Props) {
  return (
    <div className="cards">
      <h3>{title}</h3>
      {data.length !== 0 ? (
        data.map((user) => {
          const {
            name,
            age,
            email,
            password,
            confirmPassword,
            img,
            country,
            gender,
            termCondition,
          } = user;
          return (
            <div className="card" key={name}>
              <h4>{name}</h4>
              {typeof img === 'string' && <img src={img} alt={name} />}
              <ul>
                <li>Age{age}</li>
                <li>email{email}</li>
                <li>password{password}</li>
                <li>confirmPassword{confirmPassword}</li>
                <li>country{country}</li>
                <li>gender{gender}</li>
                <li>termCondition{termCondition}</li>
              </ul>
            </div>
          );
        })
      ) : (
        <h3>Not users</h3>
      )}
    </div>
  );
}
// name: string;
// age: number;
// email: string;
// password: string;
// confirmPassword: string;
// gender: string;
// termCondition: string;
// img: string | null | FileList;
// country: string;
