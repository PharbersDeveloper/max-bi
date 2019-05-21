import { helper } from '@ember/component/helper';

export function num2milFixed2(params/*, hash*/) {
  let number = Number(params[0]);
  number = number/1000000;
  number = number.toFixed(2);

  let result = number.toString().indexOf('.') !== -1 ? number.toLocaleString() : number.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  return result;
}

export default helper(num2milFixed2);
