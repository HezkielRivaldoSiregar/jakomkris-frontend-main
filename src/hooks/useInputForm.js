import { useState } from 'react'
import { get, set } from 'lodash'

export function serialize (obj, prefix) {
  var str = [],
    p
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + '[' + p + ']' : p,
        v = obj[p]
      str.push((v !== null && typeof v === 'object') ?
        serialize(v, k) :
        encodeURIComponent(k) + '=' + encodeURIComponent(v))
    }
  }
  return str.join('&')
}

const useInputForm = (initialValue) => {
  const [formValues, setFormValues] = useState(initialValue)

  const handleChange = (e) => {
    const { id, value, dataset } = e.target
    const { withObjectValue, parser } = dataset || {}

    let finalValue = value

    if (withObjectValue) finalValue = JSON.parse(finalValue)

    if (parser === 'float') finalValue = parseFloat(finalValue)

    setFormValues((curFormValues) => {
      return {
        ...set(curFormValues, id, finalValue),
      }
    })
  }

  return [
    formValues,
    setFormValues,
    function getInputProps (valueName) {
      return {
        value: get(formValues, valueName),
        onChange: handleChange,
      }
    },
  ]
}

export default useInputForm;
