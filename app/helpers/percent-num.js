import { helper } from '@ember/component/helper';

export function percentNum(params/*, hash*/) {
  if(params[0] == undefined || typeof(params[0]) != "number") {
    // return (0).toFixed(2);
    return "-";
  } else {
    return (params[0]*100).toFixed(2);
  }
}

export default helper(percentNum);
