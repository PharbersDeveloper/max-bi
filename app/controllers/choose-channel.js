import Controller from '@ember/controller';

export default Controller.extend({

    actions: {
        onCardClick(param) {
            window.console.log(param);
            if(param == '城市渠道') {
                this.transitionToRoute('analysis');
            } else {
                this.transitionToRoute('chc-analysis');
            }
        }
    }
});
