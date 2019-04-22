import Component from '@ember/component';

export default Component.extend({
    content: null,
    templateHtml: null,

    didInsertElement() {
        this._super(...arguments);
        $('auth').append(`${this.get('content')}`)
    }
});
