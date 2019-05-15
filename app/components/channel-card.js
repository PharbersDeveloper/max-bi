import Component from '@ember/component';

export default Component.extend({
    tagName: 'div',
    classNames: ['channel-card'],

    actions: {
        btnClick(param) {
            this.onCardClick(param);
        }
    }
});
