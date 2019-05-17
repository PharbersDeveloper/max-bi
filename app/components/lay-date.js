import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['lang', 'pickType', 'range', 'inputVal'],
    classNameBindings: ['pickType', 'cssClass'],
    lang: 'zh',
    pickType: 'date',
    cssClass: '',
    range: false,
    inputVal: new Date().getTime(),

    gid: computed(function(){
        return this.guid();
    }),
    didInsertElement() {
        if(this.pickType === "time"){
            let that = this
            window.laydate.render({
                elem: window.document.getElementById(this.gid), //指定元素
                type: this.pickType,
                range: this.range,
                lang: this.lang,
                btns: ['now', 'confirm'],
                format: 'HH:mm',
                value: new Date(this.get('inputVal')),
                done: function(value/*, date*/){ //监听日期被切换
                    let tmp = new Date();
                    let lst = value.split(':')
                    tmp.setHours(parseInt(lst[0]));
                    tmp.setMinutes(parseInt(lst[1]));
                    tmp.setSeconds(0);
                    that.set('inputVal', tmp.getTime());
                }
            });
        }else{
            let that = this
            window.laydate.render({
                elem: window.document.getElementById(this.gid), //指定元素
                type: this.pickType,
                range: this.range,
                lang: this.lang,
                value: new Date(this.get('inputVal')),
                done: function(value/*, date*/){ //监听日期被切换
                    let tmp = new Date();
                    let lst = value.split('-')
                    tmp.setFullYear(parseInt(lst[0]));
                    tmp.setMonth(parseInt(lst[1]) - 1);
                    tmp.setDate(parseInt(lst[2]));
                    that.set('inputVal', tmp.getTime());
                }
            });
        }
    },
    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
});
