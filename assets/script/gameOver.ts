import GameMgr from "./gameMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameOver extends cc.Component {

    @property(cc.Label)
    playTimeLabel: cc.Label = null;

    @property(cc.Label)
    currentScoreLabel: cc.Label = null;

    @property(cc.Label)
    highestScoreLabel: cc.Label = null;

    @property(cc.AudioClip)
    btnAudio: cc.AudioClip = null;

    @property(cc.Scene)
    btnPlay: cc.Scene = null

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.gainPlayTime()
        this.node.on('btnPlay', function (msg) {
            cc.log(msg)
        });
    }

    getHighestScore() {
        let highData = {
            highestScore: GameMgr.score,
        }
        let getScore = JSON.parse(cc.sys.localStorage.getItem('highData'));
        let highScore = 0;
        if (!getScore) {
            cc.sys.localStorage.setItem('highData', JSON.stringify(highData));
            highScore = GameMgr.score;
        } else {
            if (getScore.highestScore < GameMgr.score) {
                cc.sys.localStorage.setItem('highData', JSON.stringify(highData));
                highScore = GameMgr.score;
            } else {
                highScore = getScore.highestScore;
            }
        }
    }

    gainPlayTime() {
        this.getHighestScore();
        this.playTimeLabel.string = 'Play Time: ' + GameMgr.time.toString();
        this.currentScoreLabel.string = 'Play Score: ' + GameMgr.score.toString();
        var getScore = JSON.parse(cc.sys.localStorage.getItem('highData'));
        this.highestScoreLabel.string = 'Highest Score: ' + getScore.highestScore.toString();
    }

    directorScene() {
        cc.director.loadScene('game');
        cc.audioEngine.playEffect(this.btnAudio, false);
        GameMgr.isLoadOverGame = false;
    }

    start() {

    }

    update(dt) {

    }
}
