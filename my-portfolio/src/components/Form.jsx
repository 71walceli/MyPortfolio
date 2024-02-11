
export const GenericInput = ({type, value, onChange, name, ...props}) => {
  const commonProps = { 
    value, 
    onChange: e => onChange(e.target.value), 
    name,
    className: props.className || "form-control w-100"+props.error && " is-invalid",
  }

  return <>
    {props.rows 
      ? <textarea {...props} {...commonProps} />
      : <input {...props} {...commonProps} />
    }
    {props.error && <div className="form-control-error text-danger">{props.error}</div>}
  </>
}
