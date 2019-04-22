import { helper } from '@ember/component/helper';

export function yearMonth(params/*, hash*/) {
  return params.toString().slice(0,4) + '-' + params.toString().slice(4,6);
}

export default helper(yearMonth);
