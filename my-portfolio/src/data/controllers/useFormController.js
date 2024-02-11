import React from "react";

// TODO Add to my global library
export const useFormController = (defaultData, _validator) => {
  const [data, setData] = React.useState(defaultData || {})
  const [errors, setErrors] = React.useState({})
  const [isValid, setValid] = React.useState(false)
  const [isSubmitted, setSubmitted] = React.useState(false)
  // TODO Save to cookies if not submitted
  const [autosaveToCookies, setAutosaveToCookies] = React.useState(true)
  const [validator, setValidator] = React.useState(_validator)

  React.useEffect(_ => {
    if (!validator)
      return
    setErrors(() => {
      let valid = true
      const errors = validator.check(data)
      for (let key in errors) {
        if (!errors[key].errorMessage){
          delete errors[key]
          continue
        }
        valid = false
        errors[key] = errors[key].errorMessage
      }
      setValid(valid)
      return errors
    })
  }, [data, validator])

  return { data, set: setData, errors, isValid, isSubmitted, setSubmitted, validator, setValidator }
}
