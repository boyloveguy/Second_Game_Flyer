import GameMgr from "./gameMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyMGR extends cc.Component {

    @property(cc.Prefab)
    enemy: cc.Prefab = null;

    @property(cc.Node)
    player: cc.Node = null

    @property(cc.Label)
    Time: cc.Label = null;

    @property(cc.Label)
    Score: cc.Label = null;

    @property(cc.AudioClip)
    playerAudio: cc.AudioClip = null;

    timeCurent: number = 60;
    timePlay: number = 0;
    scores: number = 0;
    time: number = 0;
    // userData: object;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    }

    start() {
        this.schedule(this.createOneEnemy, 4);
        // this.gainTimeCurent()
    }

    createOneEnemy() {
        let e = cc.instantiate(this.enemy);
        e.parent = this.node;
        e.x = -300 + 600 * Math.random();
        e.y = 750;
        e.getComponent('enemyTS').game = this;
    }

    increaseTime() {
        this.timeCurent += 10
        if (this.timeCurent >= 60) {
            this.timeCurent = 60
        }
    }

    fancyTimeFormat(duration) {
        // Hours, minutes and seconds
        const hrs = ~~(duration / 3600);
        const mins = ~~((duration % 3600) / 60);
        const secs = ~~duration % 60;
      
        // Output like "1:01" or "4:03:59" or "123:03:59"
        let ret = "";
      
        if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
      
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
      
        return ret;
      }

    getPlayTime(playTime) {
        GameMgr.time = playTime;
        GameMgr.score = this.scores;
    }



    gainScoreCurent() {
        this.scores += 1;
        this.Score.getComponent(cc.Label).string = 'Score: ' + this.scores.toString();
    }

    update(dt) {
        this.timeCurent -= dt
        this.timePlay += dt
        this.getPlayTime(this.timePlay.toFixed(0));
        let time = this.fancyTimeFormat(this.timeCurent)
        this.Time.getComponent(cc.Label).string = 'Time: ' + time

        if(this.timeCurent < 0){
            GameMgr.isLoadScene = true;
            cc.director.loadScene('gameOver');
        }
        // cc.log('111')
    }
}
