interface FormRowSelectProps {
  name: string;
  labelText?: string;
  list: string[][];
}

const FormRowSelect = ({ name, labelText, list }: FormRowSelectProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select name={name} id={name} className="form-select">
        {list?.length &&
          list.map(([key, value]) => {
            return (
              <option key={key} value={key}>
                {value}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default FormRowSelect;
