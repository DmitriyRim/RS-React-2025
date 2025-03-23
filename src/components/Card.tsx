import { Link } from 'react-router';
import { Country } from '../types/types';

interface Props {
  country: Country;
}

export default function Card({ country }: Props) {
  const {
    name: { common, official },
    population,
    region,
    flags,
  } = country;
  const imgUrls = Object.values(flags);
  const isVisit = (name: string): boolean => {
    const ls = localStorage.getItem('countries');
    const countries: string[] = ls && JSON.parse(ls);
    return countries.includes(name);
  };

  return (
    <div key={common} className={`card ${isVisit(common) && 'visited'}`}>
      <Link to={`/${common}`}>
        <h4>
          {common}
          <span className="subtitle">{official}</span>
        </h4>
      </Link>
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
              alt={common}
              key={common}
            />
          }
        </div>
      </div>
    </div>
  );
}
