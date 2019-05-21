import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
    keyName: A([
        { id: 1, name: '将进酒' },
        { id: 2, name: '桃花源记' },
        { id: 3, name: '滕王阁序' },
        { id: 4, name: '林尽水源' },

    ]),
});
