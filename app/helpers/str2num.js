import { helper } from '@ember/component/helper';

export function str2num(params/*, hash*/) {
  if (params[0] == undefined) {
    return "-";
  } else {
    return Number(params[0]);
  }
}

export default helper(str2num);
