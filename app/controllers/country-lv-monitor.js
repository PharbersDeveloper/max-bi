import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
    init() {
		this._super(...arguments);
		this.set('lineData', A([{
			name: 'MNC',
			date: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05',
				'2018-06', '2018-07', '2018-08',
				'2018-09', '2018-10', '2018-11', '2018-12'],
			data: [320, 332, 301, 334, 390, 330, 320, 255, 350, 337, 365, 912]
		},
		{
			name: 'ELILILLY GROUP',
			date: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05',
				'2018-06', '2018-07', '2018-08',
				'2018-09', '2018-10', '2018-11', '2018-12'],
			data: [820, 932, 901, 934, 1290, 1330, 1320, 244, 365, 109, 203, 273]
		}]));
        this.set('lineColor', A(['#0070c0', '#c00000']));
        
        this.set('pieData', [
			{ value: 32.3, name: 'Lilly Insulin' },
			{ value: 9.0, name: 'Gemzar' },
			{ value: 8.4, name: 'Alimta' },
			{ value: 5.0, name: 'Prozac' },
			{ value: 6.0, name: 'Cymbalta' },
			{ value: 10.7, name: 'Zyprexa' },
			{ value: 2.0, name: 'Strattera' },
			{ value: 5.0, name: 'Coclor' },
			{ value: 19.5, name: 'Vancocin' },
			{ value: 1.9, name: 'Cialis' },
			{ value: 0.1, name: 'Evista' }
        ]);
        
        this.set('barData', A([
			{ prodName: 'Stanley May', value: 1.6861, type: 'MNC' },
			{ prodName: 'Ray Dean', value: 4.599, type: 'Local' },
			{ prodName: 'Celia Sims', value: 3.9925, type: 'MNC' },
			{ prodName: 'Alberta Fields', value: 1.1181, type: 'Local' },
			{ prodName: 'Annie Mack', value: 1.4165, type: 'MNC' },
			{ prodName: 'Ricardo Roy', value: 2.4944, type: 'Local' },
			{ prodName: 'Lottie Parsons', value: 2.0540, type: 'Local' },
			{ prodName: 'Isabelle Walters', value: 1.9328, type: 'MNC' },
			{ prodName: 'Gary Ortega', value: 2.7467, type: 'Local' },
			{ prodName: 'Julian Morrison', value: 2.3548, type: 'MNC' },
			{ prodName: 'Charlotte Fields', value: 5.4294, type: 'Local' },
			{ prodName: 'Carlos Price', value: 9.825, type: 'Local' },
			{ prodName: 'Isabella Schwartz', value: 9.319, type: 'MNC' },
			{ prodName: 'Nathaniel Keller', value: 1.6843, type: 'Local' },
			{ prodName: 'Frank King', value: 1.9282, type: 'MNC' },
			{ prodName: 'Maria Ramos', value: 6.4827, type: 'Local' },
			{ prodName: 'Rena Harper', value: 5.1307, type: 'Local' },
			{ prodName: 'Gene Johnston', value: 3.3600, type: 'MNC' },
			{ prodName: 'Leon Watson', value: 5.5585, type: 'Local' },
			{ prodName: 'May Stevenson', value: 5.5079, type: 'Local' },
			{ prodName: 'Jimmy Holmes', value: 3.2692, type: 'MNC' },
			{ prodName: 'Ernest Anderson', value: 1.397, type: 'Lilly' },
		]));
	},

    marketArr: A([{name: 'INF'}]),
    timeArr: A([{name: '2017/04'}]),
    cur_market: '',
    cur_time: '',

});
