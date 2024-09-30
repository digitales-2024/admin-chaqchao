import "react-phone-number-input/style.css"; // Importa los estilos por defecto
import { isValidPhoneNumber } from "libphonenumber-js";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";

// Define las propiedades del componente
interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
  placeholder = "Enter phone number",
}) => {
  const [error, setError] = useState<string | null>(null);

  const handlePhoneNumberChange = (phone: string | undefined) => {
    if (phone && !isValidPhoneNumber(phone)) {
      setError("Invalid phone number");
    } else {
      setError(null);
    }
    onChange(phone || "");
  };

  return (
    <div>
      {/* Estilos para ocultar las banderas y mostrar abreviaturas */}
      <style>
        {`
          .PhoneInputCountryIcon {
            display: none; /* Oculta las banderas */
          }
          .PhoneInputCountrySelect {
            padding-left: 5px; /* Espaciado para el selector */
          }
        `}
      </style>

      <PhoneInput
        placeholder={placeholder}
        value={value}
        onChange={handlePhoneNumberChange}
        defaultCountry="US"
        international
        countrySelectProps={{
          // Cambiar el valor de label a la abreviatura del país en mayúsculas
          getOptionLabel: (country: string) => country.toUpperCase(),
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PhoneNumberInput;
