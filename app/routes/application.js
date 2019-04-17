import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
	cookies: service(),
	// beforeModel({ targetName }) {
	// 	window.console.log(targetName);
	// 	let token = this.get('cookies').read('token');
	// 	if(targetName === 'oauth-callback') {
	// 		return;
	// 	}
	// 	if(token != undefined && token != null && token != '') {
	// 		window.console.log("have auth");
	// 	} else {
	// 		// debugger
	// 		this.transitionTo('index');
	// 		// if(localStorage.getItem('needRedirect') == 'false') {
    //         //     // 跳转到授权页
	// 		// } else {
	// 		// 	this.transitionTo('index');
	// 		// }
	// 	}
	// }
});
