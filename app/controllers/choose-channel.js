import Controller from '@ember/controller';

export default Controller.extend({

    actions: {
        onCardClick(param) {
            window.console.log(param);
            this.transitionToRoute('analysis');
        }
    }
});
