require('./style/css/app.scss');
require('./plugin/spop/spop.min.css');
require('./plugin/bootstrap/css/bootstrap.min.css');
require('./plugin/bootstrap/js/bootstrap.min.js');
import Vue from 'vue'
import Server from './script/server/server.js'
import Message from './script/message.js'

new Vue({
    el: '#app',
    data: function () {
        return {
            bogeys: {},
            bogeyKill: {},
            settings: {
                mwyhLimit: {
                    "御魂": 10,
                    "镰鼬": 10,
                    "雪童子": 10,
                    "清姬": 10,
                    "彼岸花": 10,
                    "妖狐": 10,
                    "吸血姬": 10,
                    "青行灯": 10,
                    "海坊主": 10,
                    "小鹿男": 10,
                    "姑获鸟": 10,
                    "大天狗": 10,
                    "荒川": 10,
                    "雨女": 10,
                    "河童": 10,
                    "妖刀": 10,
                    "红叶": 10,
                    "山兔": 10,
                    "金鱼姬": 10
                },
                levelLimit: 28
            },
            res: {},
            killObject: {},
            resString: "目前没有可用方案"
        }
    },
    mounted: function () {

        let localSave = localStorage["settings"];

        if (localSave) {
            for (name in this.settings.mwyhLimit) {
                this.$set(this.settings.mwyhLimit, name,
                    JSON.parse(localSave)['mwyhLimit'][name] == null ?
                        this.settings.mwyhLimit[name] :
                        JSON.parse(localSave)['mwyhLimit'][name]);
            }
        }

        let bogeys = localStorage["bogeys"];
        if (bogeys) {
            this.bogeys = JSON.parse(bogeys);
            this.initKill(this.bogeys);
        } else {
            Server.bogeys().then((res) => {
                this.bogeys = res;
                this.initKill(this.bogeys);
                localStorage.setItem("bogeys", JSON.stringify(this.bogeys));
            });
        }

        $(".nav a").click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        }).on('shown.bs.tab', (e) => {
            if (e.target.hash === '#bogey') {
                $(".submit").show()
            } else {
                $(".submit").hide()
            }
        });

        $("a[href='#bogey']").trigger('click');
    },
    methods: {
        getRes: function () {

            let kill = {};

            for (name in this.bogeyKill) {
                if (this.bogeyKill[name] > 0) {
                    kill[name] = this.bogeyKill[name];
                }
            }

            if (Object.keys(kill).length > 0) {
                this.killObject = kill;
                this.resString = "正在生成方案......";

                Server.cal({
                    "killBogey": kill,
                    "mwyhLimit": this.settings.mwyhLimit,
                    "levelLimit": this.settings.levelLimit
                }).then((res) => {
                    this.res = res;
                    if (Object.keys(kill).length === 0) {
                        this.resString = "目前没有可用方案";
                    }
                });
            }

            $("a[href='#res']").trigger('click');
        },
        clearChoose: function () {
            for (name in this.bogeyKill) {
                if (this.bogeyKill[name] > 0) {
                    this.$set(this.bogeyKill, name, 0);
                }
            }
            this.res = {};
            this.killObject = {};
            this.resString = "目前没有可用方案";
            $("a[href='#bogey']").trigger('click');
        }, saveSettings: function () {
            localStorage.setItem("settings", JSON.stringify(this.settings));
            Message.success('保存成功');
        }, initKill: function (res) {
            for (let bogeyAlpha in res) {
                let bogeyNames = res[bogeyAlpha];
                bogeyNames.forEach(name => {
                    this.$set(this.bogeyKill, name, 0);
                })
            }
        }
    }
});


