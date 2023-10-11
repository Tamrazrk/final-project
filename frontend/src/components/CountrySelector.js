import { useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';


function CountrySelector({ value, handleChange }) {
  const options = useMemo(() => countryList().getData(), [])

  return (
    <div>
      <label>country</label>
      <Select options={options} value={{value: "FSfs",label: value}} onChange={handleChange} />
    </div>
  )
}

export default CountrySelector
