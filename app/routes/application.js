import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
	cookies: service(),
	beforeModel({ targetName }) {
		window.console.log(targetName);
		let token = this.get('cookies').read('token');
		let scope = this.get('cookies').read('scope');
		if(targetName === 'oauth-callback') {
			return;
		}
		if(token != undefined && token != null && token != '') {
			// 判断权限范围
			window.console.log(scope.match(/\[(.+)\]/));
			
			if(scope.match(/\(([^)]*)\)/)) {
				window.console.log("have auth");
			} else {
				window.console.log("scope do not contained current project");
				this.transitionTo('index');
			}
		} else {
			window.console.log("do not have auth");
			this.transitionTo('index');
			// if(localStorage.getItem('needRedirect') == 'false') {
            //     // 跳转到授权页
			// } else {
			// 	this.transitionTo('index');
			// }
		}
	}
});
