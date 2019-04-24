import Net from './net.js'

export default {
    bogeys: function () {
        return Net.get('/bogeys');
    },
    cal: function (killInfo) {
        return Net.post('/cal', killInfo)
    }
}
