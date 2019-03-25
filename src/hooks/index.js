import { useState } from 'react';
export function useFormInput(initialValue, inputProps = {}) {
  const [value, setValue] = useState(initialValue);
  function handleOnchange(e) {
    setValue(e.target.value)
  }
  return {
    value,
    onChange: handleOnchange,
    ...inputProps
  }
}