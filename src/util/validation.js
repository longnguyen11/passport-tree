export default function validate(values) {
  let errors = {};
  if (!values.name) {
    errors.name = 'Name is required';
  } 
  if (!values.min) {
    errors.min = 'Minimum value is required';
  } 
  if (!values.max) {
    errors.max = 'Maximum value is required';
  } 
  return errors;
};