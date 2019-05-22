import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
	model() {
		return RSVP.hash({
			marketData: this.store.query('market', {'company-id': 'pharbers'}),
			
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
		})
	},
	setupController(controller, model) {
        this._super(controller, model);
		this.controller.set('curMarket', model.marketData.firstObject);
		// this.controller.set('overallInfo', model.marketData.firstObject.get('id'));
		// console.log(this.controller.get('curMarket'));
    }
});
