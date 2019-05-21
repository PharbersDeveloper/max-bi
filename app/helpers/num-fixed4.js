import { helper } from '@ember/component/helper';

export function numFixed4(params/*, hash*/) {
  let number = Number(params[0]);
  number = number.toFixed(4);

  let result = number.toString().indexOf('.') !== -1 ? number.toLocaleString() : number.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  return result;
}

export default helper(numFixed4);
