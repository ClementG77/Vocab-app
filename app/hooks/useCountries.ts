import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByName = (name: string) => {
    return formattedCountries.find((item) => item.label === name);
  }

  return {
    getAll,
    getByName
  }
};

export default useCountries;