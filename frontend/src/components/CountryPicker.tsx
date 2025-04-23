import React from 'react'

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
]

interface CountryPickerProps {
  value: string
  onChange: (value: string) => void
}

function CountryPicker({ value, onChange }: CountryPickerProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
    >
      <option value="">Select your country</option>
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.flag} {country.name}
        </option>
      ))}
    </select>
  )
}

export default CountryPicker
