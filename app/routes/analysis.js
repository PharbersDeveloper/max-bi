import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
	model() {
		return RSVP.hash({
			markets: this.store.query('market', {'COMPANY_ID': '5ca069e2eeefcc012918ec73'}),
			scatterData: A([
				[[66666, 57, 100000, 'test1']],
				[[12225, 81, 100000, 'test2']],
				[[55555, 57, 100000, 'test3']],
				[[33333, 45, 100000, 'test4']],
				[[22222, 57, 255555, 'test5']]
			]),
			stackData: A([
				{ name: 'keyong', data: [5, 20, 36, 10, 10, 20] },
				{ name: 'bukeyong', data: [40, 22, 18, 35, 42, 40] },
				{ name: 'qita', data: [40, 22, 18, 35, 42, 40] }]),
			doubleData: A([{
				name: '蒸发量',
				type: 'bar',
				yAxisIndex: 1,
				data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7]
			},
			{
				name: '降水量',
				type: 'bar',
				yAxisIndex: 1,
				data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7]
			},
			{
				name: '平均温度',
				type: 'line',
				data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2]
			}]),
			mapData: A([{
				name: '江苏省',
				value: 5.3
			}, {
				name: '北京市',
				value: 3.8
			}, {
				name: '上海',
				value: 4.6
			}, {
				name: '重庆',
				value: 3.6
			}, {
				name: '河北',
				value: 3.4
			}, {
				name: '河南',
				value: 3.2
			}, {
				name: '云南',
				value: 1.6
			}, {
				name: '辽宁',
				value: 4.3
			}, {
				name: '黑龙江',
				value: 4.1
			}, {
				name: '湖南',
				value: 2.4
			}, {
				name: '安徽',
				value: 3.3
			}, {
				name: '山东',
				value: 3.0
			}, {
				name: '新疆',
				value: 1
			}, {
				name: '江苏',
				value: 3.9
			}, {
				name: '浙江',
				value: 3.5
			}, {
				name: '江西',
				value: 2.0
			}, {
				name: '湖北',
				value: 2.1
			}, {
				name: '广西',
				value: 3.0
			}, {
				name: '甘肃',
				value: 1.2
			}, {
				name: '山西',
				value: 3.2
			}, {
				name: '内蒙古',
				value: 3.5
			}, {
				name: '陕西',
				value: 2.5
			}, {
				name: '吉林',
				value: 4.5
			}, {
				name: '福建',
				value: 2.8
			}, {
				name: '贵州',
				value: 80
			}, {
				name: '广东',
				value: 100
			}, {
				name: '青海',
				value: 43
			}, {
				name: '西藏',
				value: 33
			}, {
				name: '四川',
				value: 3.3
			}, {
				name: '宁夏',
				value: 0.8
			}, {
				name: '海南',
				value: 1.9
			}, {
				name: '台湾',
				value: 0.1
			}, {
				name: '香港',
				value: 50
			}, {
				name: '澳门',
				value: 88
			}
			])
		})
	},
	setupController(controller,model){
		let markets = model.markets;
		let marketArr = [];
		markets.forEach((item) => {
			let market = {
				id: item.market,
				market: item.market,
			}
			marketArr.push(market)
		})
        // controller.set('ymValue', arrval.firstObject.ym);
        // controller.set('timeArr', arrval);
        // controller.set('marketsArr', markets);
        controller.set('marketArr', marketArr);
        controller.set('marketValue', marketArr.firstObject);
    }
});
