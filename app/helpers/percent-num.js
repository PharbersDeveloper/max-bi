import { helper } from '@ember/component/helper';

export function percentNum(params/*, hash*/) {
  return (params*100).toFixed(2);
}

export default helper(percentNum);
