import { helper } from '@ember/component/helper';

export function timehelperTime2fullformat(params/*, hash*/) {
  let temp = params[0];
	let time = new Date(temp);

	return (time.getFullYear() + '-' + (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-' + (time.getDate() < 10 ? '0' + time.getDate() : time.getDate())) + ' ' + (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) + ':' + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ':' + (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds());
}

export default helper(timehelperTime2fullformat);
