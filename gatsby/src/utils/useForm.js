import { useState } from 'react'

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults)

  function updateValue(e) {
    // check if number and convert
    let value = e.target.value
    if (e.target.type == 'number') {
      value = parseInt(value)
    }
    setValues({
      // Copy in existing values
      ...values,
      // dynamically update value
      [e.target.name]: value,
    })
  }

  return { values, updateValue }
}
