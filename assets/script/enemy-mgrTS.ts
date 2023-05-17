// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
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

    getTime: number = 60;
    timeCurent: number = 0;
    scores: number = 0;
    time: number = 0;
    // userData: object;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    }
    
    start() {
        this.schedule(this.createOneEnemy, 4);
        this.gainTimeCurent()
    }

    createOneEnemy() {
        let e = cc.instantiate(this.enemy);
        e.parent = this.node;
        e.x = -300 + 600 * Math.random();
        e.y = 750;
        e.getComponent('enemyTS').game = this;
    }

    increaseTime() {
        this.getTime += 10
        if (this.getTime >= 60) {
            this.getTime = 60
        }
    }

    gainTimeCurent() {
        this.Time.getComponent(cc.Label).string = 'Time: ' + this.getTime.toString();
        this.getTime -= 1
        let countdown = setInterval(() => {
            if (this.getTime < 0 || GameMgr.isLoadOverGame == true) {
                clearInterval(countdown);
                cc.director.loadScene('gameOver');
                return;
            }
            this.Time.getComponent(cc.Label).string = 'Time: ' + this.getTime.toString();
            --this.getTime;
        }, 1000);
    }

    getPlayTime(playTime) {
        GameMgr.time = playTime-1;
        GameMgr.score = this.scores;
    }

    getHighestScore() {
        let highData = {
            highestScore: this.scores,
        }
        var getScore = JSON.parse(cc.sys.localStorage.getItem('highData'));
        let highScore = 0;
        if (!getScore) {
            cc.sys.localStorage.setItem('highData', JSON.stringify(highData));
            highScore = this.scores;
        } else {
            if (getScore.highestScore < this.scores) {
                cc.sys.localStorage.setItem('highData', JSON.stringify(highData));
                highScore = this.scores;
            } else {
                highScore = getScore.highestScore;
            }
        }

    }

    gainScoreCurent() {
        this.scores += 1;
        this.Score.getComponent(cc.Label).string = 'Score: ' + this.scores.toString();
    }

    update(dt) {
        this.timeCurent += dt
        this.getPlayTime(this.timeCurent.toFixed(0));
        this.getHighestScore();
    }
}
