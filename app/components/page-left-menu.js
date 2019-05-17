import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
    
    keyValue: A([
        { id: 1, value: '将进酒' },
        { id: 2, value: '桃花源记' },
        { id: 3, value: '滕王阁序' },
        { id: 4, value: '林尽水源' },

    ]),
    keyName: A([
        { id: 1, name: '将进酒' },
        { id: 2, name: '桃花源记' },
        { id: 3, name: '滕王阁序' },
        { id: 4, name: '林尽水源' },

    ]),
});
