require('../plugin/spop/spop.min.js');

export default {

    error: function (content) {
        this.toPop(content, 'error')
    },
    warning: function (content) {
        this.toPop(content, 'warning')
    },
    info: function (content) {
        this.toPop(content, 'info')
    },
    success: function (content) {
        this.toPop(content, 'success')
    },
    toPop: function (content, style, time = 2000) {
        if (time < 0) {
            time = false;
        }
        spop({
            template: content,
            position: 'top-center',
            autoclose: time,
            style: style
        });
    }
}