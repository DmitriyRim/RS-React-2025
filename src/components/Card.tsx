import { Country } from '../types/types';

interface Props {
  country: Country;
}

export default function Card({ country }: Props) {
  const { name, population, region, flags } = country;
  const imgUrls = Object.values(flags);

  return (
    <div key={name.common} className="card">
      <h4>
        {name.common}
        <span className="subtitle">{name.official}</span>
      </h4>
      <div className="card-description">
        <ul>
          <li>Population: {population}</li>
          <li>Region: {region}</li>
        </ul>
        <div className="flags">
          {
            <img
              className="card-img"
              src={imgUrls[0]}
              alt={name.common}
              key={name.common}
            />
          }
        </div>
      </div>
    </div>
  );
}
