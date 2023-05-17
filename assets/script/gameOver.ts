// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
import GameMgr from "./gameMgr";
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameOver extends cc.Component {

    @property(cc.Label)
    playTimeLable: cc.Label = null;
    
    @property(cc.Label)
    currentScoreLable: cc.Label = null;
    
    @property(cc.Label)
    highestScoreLable: cc.Label = null;

    @property(cc.AudioClip)
    btnAudio: cc.AudioClip = null;

    @property(cc.Scene)
    btnPlay: cc.Scene = null

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.gainPlayTime()
          this.node.on('btnPlay', function (msg) {
            cc.log(msg)
          });
    }

    gainPlayTime(){
        this.playTimeLable.string = 'Play Time: ' + GameMgr.time.toString();
        this.currentScoreLable.string = 'Play Score: ' + GameMgr.score.toString();
        var getScore = JSON.parse(cc.sys.localStorage.getItem('highData'));
        this.highestScoreLable.string = 'Highest Score: ' + getScore.highestScore.toString();
    }
    
    directorScene() {
        cc.director.loadScene('game');
        cc.audioEngine.playEffect(this.btnAudio, false);
        GameMgr.isLoadOverGame = false;    
    }

    start () {

    }

    // update (dt) {}
}
