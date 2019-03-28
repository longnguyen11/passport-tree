import { get } from 'lodash';
export function validateRootForm(values) {
  let errors = {};
  if (!get(values, 'name')) {
    errors.name = 'Name is required';
  }
  const min = get(values, 'min');
  const max = get(values, 'max');
  if (!min) {
    errors.min = 'Minimum value is required';
  }
  if (!max) {
    errors.max = 'Maximum value is required';
  }
  if (min && max && parseInt(min) > parseInt(max)) {
    errors.compare = 'Minimum value cannot be more than maximum value'
  }
  return errors;
}

export function validateBranchForm(values) {
  let errors = {};
  const min = get(values, 'min');
  const max = get(values, 'max');
  const amount = get(values, 'amount');
  if (!min) {
    errors.min = 'Minimum value is required';
  }
  if (!max) {
    errors.max = 'Maximum value is required';
  }
  if (!amount) {
    errors.amount = 'Range value is required';
  }
  if (min && max && parseInt(min) > parseInt(max)) {
    errors.compare = 'Minimum value cannot be more than maximum value'
  }
  if (amount && (parseInt(amount) > 15 || parseInt(amount) < 1)) {
    errors.range = 'This can only generate from 1-15 number at a time'
  }
  return errors;
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function uuid() {
  return _p8() + _p8(true) + _p8(true) + _p8();
}
function _p8(s) {
  var p = (Math.random().toString(16)+"000000000").substr(2,8);
  return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
}