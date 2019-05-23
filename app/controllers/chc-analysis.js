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
	overallLineData: A([]),
	productTableListDataByCity: A([]),
	totalProObjByCity: null,
	bubbleMapListData: A([]),
	cityPerformenceData: null,
	cityLineData: A([]),

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
			res.forEach((elem, index, arr) => {
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
					if(finalArr.length == arr.length) {
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
					}
				})
			})
		})
        return result;
	}),

	overallLineList: computed('curInfoId', 'cur_tab_idx', 'curDate', 'dateDataStateFlag', function() {
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
			res.forEach((elem, index, arr) => {
				let tempObj = {};
				let tempArrX = A([]);
				let tempArrY = A([]);
				tempObj.name = elem.product.get('title');
				tempRecords[index] = this.store.query('salesRecord', {
					'info-id': this.curInfoId, 
					// 'date': this.curDate.date,
					'date-type': 2,
					'address-type': this.cur_tab_idx,
					'goods-type': 1,
					'goods-id': elem.goodsId,
					'value-type': 1,
					'orderby': 'DATE',
					'skip': 0,
					'take': 8,
				});
				tempRecords[index].then(result => {
					// window.console.log(result);
					result.forEach(ele => {
						tempArrX.push(ele.date)
						tempArrY.push(ele.value)
					})
					tempObj.date = tempArrX;
					tempObj.data = tempArrY;
					finalArr.pushObject(tempObj);
					if(finalArr.length == arr.length) {
						// window.console.log(finalArr);
						this.set('overallLineData', finalArr);
					}
				})
			})
		})
        return result;
	}),

	bubbleMapList: computed('curInfoId', 'cur_tab_idx', 'curDate', 'dateDataStateFlag', 'curCity', function() {
		if (this.curDate == undefined || this.curDate == null) {
			return;
		} 
		if (this.curCity == undefined || this.curCity == null) {
			return;
		} 
		let result = this.store.query('salesRecord', {
			'info-id': this.curInfoId, 
			'date': this.curDate.date,
			'date-type': this.curDateType,
			'address-id': this.curCity.addressId,
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
			res.forEach((elem, index, arr) => {
				// let tempObj = {};
				let tempArr = A([]);
				tempArr[3] = elem.product.get('title');
				tempRecords[index] = this.store.query('salesRecord', {
					'info-id': this.curInfoId, 
					'date': this.curDate.date,
					'date-type': this.curDateType,
					'address-id': this.curCity.addressId,
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
							tempArr[2] = ele.value;
						} else if(ele.valueType == 2) {
							tempArr[1] = ele.value;
						} else if(ele.valueType == 3) {
							tempArr[0] = ele.value;
						}
					})
					finalArr.pushObject(A([tempArr]))
					if(finalArr.length == arr.length) {
						// window.console.log(finalArr);
						this.set('bubbleMapListData', finalArr);
					}
				})
			})
		})
        return result;
	}),

	productTableListByCity: computed('curInfoId', 'cur_tab_idx', 'curDate', 'dateDataStateFlag', 'curCity', function() {
		if (this.curDate == undefined || this.curDate == null) {
			return;
		} 
		if (this.curCity == undefined || this.curCity == null) {
			return;
		} 
		let result = this.store.query('salesRecord', {
			'info-id': this.curInfoId, 
			'date': this.curDate.date,
			'date-type': this.curDateType,
			'address-id': this.curCity.addressId,
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
			res.forEach((elem, index, arr) => {
				let tempObj = {};
				tempObj.brand = elem.product.get('title');
				tempRecords[index] = this.store.query('salesRecord', {
					'info-id': this.curInfoId, 
					'date': this.curDate.date,
					'date-type': this.curDateType,
					'address-id': this.curCity.addressId,
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
					if(finalArr.length == arr.length) {
						// window.console.log(finalArr);
						this.set('productTableListDataByCity', finalArr);
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
						this.set('totalProObjByCity', totalPro)
					}
				})
			})
		})
        return result;
	}),

	cityPerformenceListByCity: computed('curInfoId', 'cur_tab_idx', 'curDate', 'dateDataStateFlag', 'curCity', function() {
		if (this.curDate == undefined || this.curDate == null) {
			return;
		} 
		if (this.curCity == undefined || this.curCity == null) {
			return;
		} 
		let result1 = this.store.query('salesRecord', {
			'info-id': this.curInfoId, 
			'date': this.curDate.date,
			'date-type': this.curDateType,
			'address-type': 0,
			'goods-type': 0,
			'value-type': 1,
			'orderby': '-VALUE',
			'skip': 0,
			'take': 1,
		});
		let result2 = this.store.query('salesRecord', {
			'info-id': this.curInfoId, 
			'date': this.curDate.date,
			'date-type': this.curDateType,
			'address-type': 0,
			'goods-type': 0,
			'value-type': 2,
			'orderby': '-VALUE',
			'skip': 0,
			'take': 1,
		});
		let result3 = this.store.query('salesRecord', {
			'info-id': this.curInfoId, 
			'date': this.curDate.date,
			'date-type': this.curDateType,
			'address-id': this.curCity.addressId,
			'address-type': this.cur_tab_idx,
			'goods-type': 0,
			// 'value-type': 2,
			'orderby': 'VALUE_TYPE',
			'skip': 0,
			'take': 20,
		});

		let flag1 = false;
		let flag2 = false;
		let flag3 = false;
		let tempObj = {};
		tempObj.cityName = this.curCity.city.get('title');
		tempObj.cityTier = this.curCity.city.get('cityTier');
		result1.then(res => {
			tempObj.marketSize = res.firstObject.value;
			flag1 = true;
			if(flag1 && flag2 && flag3) {
				window.console.log(tempObj);
				this.set('cityPerformenceData', tempObj);
			}
		})
		result2.then(res => {
			tempObj.marketGrowth = res.firstObject.value;
			flag2 = true;
			if(flag1 && flag2 && flag3) {
				window.console.log(tempObj);
				this.set('cityPerformenceData', tempObj);
			}
		})
		result3.then(res => {
			res.forEach(ele => {
				if(ele.valueType == 1) {
					tempObj.citySales = ele.value;
				} else if(ele.valueType == 2) {
					tempObj.cityGrowth = ele.value;
				} else if(ele.valueType == 3) {
					tempObj.cityShare = ele.value;
				} else if(ele.valueType == 4) {
					tempObj.cityShareChange = ele.value;
				} else if(ele.valueType == 5) {
					tempObj.cityei = ele.value;
				}
			})
			flag3 = true;
			if(flag1 && flag2 && flag3) {
				window.console.log(tempObj);
				this.set('cityPerformenceData', tempObj);
			}
		})
        return result3;
	}),

	cityLineList: computed('curInfoId', 'cur_tab_idx', 'curDate', 'dateDataStateFlag', 'curCity', function() {
		if (this.curDate == undefined || this.curDate == null) {
			return;
		} 
		if (this.curCity == undefined || this.curCity == null) {
			return;
		} 
		let result = this.store.query('salesRecord', {
			'info-id': this.curInfoId, 
			'date': this.curDate.date,
			'date-type': this.curDateType,
			'address-id': this.curCity.addressId,
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
			res.forEach((elem, index, arr) => {
				let tempObj = {};
				let tempArrX = A([]);
				let tempArrY = A([]);
				tempObj.name = elem.product.get('title');
				tempRecords[index] = this.store.query('salesRecord', {
					'info-id': this.curInfoId, 
					// 'date': this.curDate.date,
					'date-type': 2,
					'address-id': this.curCity.addressId,
					'address-type': this.cur_tab_idx,
					'goods-type': 1,
					'goods-id': elem.goodsId,
					'value-type': 1,
					'orderby': 'DATE',
					'skip': 0,
					'take': 8,
				});
				tempRecords[index].then(result => {
					// window.console.log(result);
					result.forEach(ele => {
						tempArrX.push(ele.date)
						tempArrY.push(ele.value)
					})
					tempObj.date = tempArrX;
					tempObj.data = tempArrY;
					finalArr.pushObject(tempObj);
					if(finalArr.length == arr.length) {
						// window.console.log(finalArr);
						this.set('cityLineData', finalArr);
					}
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
		this.set('linelegendPosition', { right: '0', 'top': '60', type: 'scoll', orient: 'vertical' });
		this.set('grid', { right: '200px', });
		this.set('chartColor', A(['rgb(115,171,255)', 'rgb(121,226,242)', 'rgb(121,242,192)', 'rgb(54,179,126)', 'rgb(255,227,128)', 'rgb(255,171,0)', 'rgb(192,182,242)', 'rgb(101,84,192)', 'rgb(255,189,173)', 'rgb(255,143,115)', 'rgb(35,85,169)',]));
		this.set('baseNumber', 100)
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
