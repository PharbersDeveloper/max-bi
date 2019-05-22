import Controller from '@ember/controller';
import { A } from '@ember/array';
import { computed } from '@ember/object'

export default Controller.extend({
    cur_tab_idx: 0,
	tabs: A(['Overall Market', 'City Analysis']),
	collapsed: false,

	tableTake: 10,
	
	curInfoId: '',
	curMarket: null,
	curCity: null,
	curDate: null,
	curDateType: 4,

	dateDataStateFlag: false,
	
	xAxisDataHeader: A([]),
	doubleData: A([]),
	productTableListData: A([]),
	totalProObj: null,

	overallInfo: computed('curMarket', function() {
		let result = this.store.queryRecord('overallInfo', {'market-id': this.curMarket.id, 'orderby': ''});
		result.then(res => {
			this.set('curInfoId', res.id);
		})
        return result;
	}),
	
	sampleCover: computed('curInfoId', function() {
		let result = this.store.query('sampleCover', {'info-id': this.curInfoId});
		result.then(() => {
			this.setDoubleData();
		})
        return result;
	}),

	dateData: computed('curInfoId', 'curDateType', function() {
		let result = this.store.query('availableDate', {
			'info-id': this.curInfoId, 
			'date-type': this.curDateType, 
		});
		result.then(res => {
			this.set('curDate', res.firstObject);
			this.set('dateDataStateFlag', true);
		})
        return result;
	}),

	cityData: computed('curInfoId', function() {
		let result = this.store.query('availableAddress', {
			'info-id': this.curInfoId, 
			'address-type': 1, 
		});
		result.then(res => {
			this.set('curCity', res.firstObject);
		})
        return result;
	}),
	
	mktSize: computed('curInfoId', 'cur_tab_idx', 'curDate', 'dateDataStateFlag', function() {
		if (this.curDate == undefined || this.curDate == null) {
			return;
		} 
		let result = this.store.query('salesRecord', {
			'info-id': this.curInfoId, 
			'date': this.curDate.date,
			'date-type': this.curDateType,
			'address-type': this.cur_tab_idx,
			'goods-type': 0,
			'value-type': 1,
		});
		return result;
	}),

	mktGrowth: computed('curInfoId', 'cur_tab_idx', 'curDate', 'dateDataStateFlag', function() {
		if (this.curDate == undefined || this.curDate == null) {
			return;
		} 
		let result = this.store.query('salesRecord', {
			'info-id': this.curInfoId, 
			'date': this.curDate.date,
			'date-type': this.curDateType,
			'address-type': this.cur_tab_idx,
			'goods-type': 0,
			'value-type': 2,
		});
        return result;
	}),

	productTableList: computed('curInfoId', 'cur_tab_idx', 'curDate', 'dateDataStateFlag', function() {
		if (this.curDate == undefined || this.curDate == null) {
			return;
		} 
		let result = this.store.query('salesRecord', {
			'info-id': this.curInfoId, 
			'date': this.curDate.date,
			'date-type': this.curDateType,
			'address-type': this.cur_tab_idx,
			'goods-type': 1,
			'value-type': 1,
			'orderby': '-VALUE',
			'skip': 0,
			'take': this.tableTake,
		});
		result.then(res => {
			let tempRecords = A([]);
			let finalArr = A([]);
			res.forEach((elem, index) => {
				let tempObj = {};
				tempObj.brand = elem.product.get('title');
				tempRecords[index] = this.store.query('salesRecord', {
					'info-id': this.curInfoId, 
					'date': this.curDate.date,
					'date-type': this.curDateType,
					'address-type': this.cur_tab_idx,
					'goods-type': 1,
					'goods-id': elem.goodsId,
					'orderby': 'VALUE_TYPE',
					'skip': 0,
				});
				tempRecords[index].then(result => {
					// window.console.log(result);
					result.forEach(ele => {
						if(ele.valueType == 1) {
							tempObj.sales = ele.value;
						} else if(ele.valueType == 2) {
							tempObj.growth = ele.value;
						} else if(ele.valueType == 3) {
							tempObj.marketShare = ele.value;
						} else if(ele.valueType == 4) {
							tempObj.ms = ele.value;
						} else if(ele.valueType == 5) {
							tempObj.ei = ele.value;
						}
					})
					finalArr.pushObject(tempObj)
					// window.console.log(finalArr);
					this.set('productTableListData', finalArr);
					let totalPro = finalArr.reduce((total, ele) =>  {
						return {
							totalSales: Number(total.totalSales)+Number(ele.sales),
							totalMarketShare:  Number(total.totalMarketShare)+ Number(ele.marketShare),
							totalMs: total.totalMs+ele.ms,
							totalGrowth: total.totalGrowth+ele.growth,
							totalEi: total.totalEi+ele.ei
						}
					}, {totalSales:0, totalMarketShare: 0, totalMs: 0, totalGrowth: 0, totalEi: 0});
					// console.log(totalPro)
					this.set('totalProObj', totalPro)
				})
			})
		})
        return result;
	}),


    actions: {
        onTabClicked() {},
        toggle() {
            if(this.collapsed) {
                this.set('collapsed', false)
            } else {
                this.set('collapsed', true)
            }
        }
	},
	
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
		// this.set('lineColor',  A(['rgb(115,171,255)', 'rgb(255,227,128)', 'rgb(73,229,245)','rgb(52,246,188)', 'rgb(54,179,126)']));
		this.set('legendPosition', { x: 'center', y: 'center', });
	},

	
	setDoubleData() {
		// window.console.log();
		let xAxisData = A([]);
		let resultArr = A([{
			name: 'Universe',
			type: 'bar',
			yAxisIndex: 1,
			data: []
		},
		{
			name: 'Sample',
			type: 'bar',
			yAxisIndex: 1,
			data: []
		},
		{
			name: 'Coverage Ratio',
			type: 'line',
			data: []
		}]);

		this.sampleCover.forEach(elem => {
			xAxisData.push(elem.city.get('title'))
			resultArr[0].data.push(elem.universeNum);
			resultArr[1].data.push(elem.sampleNum);
			resultArr[2].data.push(elem.coverageRatio);
		});
		this.set('xAxisDataHeader', xAxisData)
		this.set('doubleData', resultArr)
	}
});
