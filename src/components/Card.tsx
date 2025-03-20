import { Country } from '../types/types';

interface Props {
  country: Country;
}

export default function Card({ country }: Props) {
  const { name, population, region, flags } = country;
  const imgUrls = Object.values(flags);

  return (
    <div key={name.common}>
      <h4>{name.common}</h4>
      <h6>{name.official}</h6>
      <p>population: {population}</p>
      <p>{region}</p>
      <div className="flags">
        {
          <img
            style={{ width: '50px' }}
            src={imgUrls[0]}
            alt={name.common}
            key={name.common}
          />
        }
      </div>
    </div>
  );
}
