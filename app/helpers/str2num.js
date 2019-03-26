import { helper } from '@ember/component/helper';

export function str2num(params/*, hash*/) {
  return Number(params);
}

export default helper(str2num);
