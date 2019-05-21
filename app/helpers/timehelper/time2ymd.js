import { helper } from '@ember/component/helper';

export function timehelperTime2ym(params/*, hash*/) {
  let temp = params[0];
	let time = new Date(temp);

	return (time.getFullYear() + '-' + (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-' + (time.getDay() + 1 < 10 ? '0' + (time.getDay() + 1) : time.getDay() + 1));
}

export default helper(timehelperTime2ym);
