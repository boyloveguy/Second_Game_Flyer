// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    playTimeLable: cc.Label = null;
    
    @property(cc.Label)
    currentScoreLable: cc.Label = null;
    
    @property(cc.Label)
    highestScoreLable: cc.Label = null;

    @property(cc.AudioClip)
    btnAudio: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.gainPlayTime()
    }

    gainPlayTime(){
        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        this.playTimeLable.string = 'Play Time: ' + userData.playTime.toString();
        this.currentScoreLable.string = 'Play Score: ' + userData.playScore.toString();
        var getScore = JSON.parse(cc.sys.localStorage.getItem('highData'));
        this.highestScoreLable.string = 'Highest Score: ' + getScore.highestScore.toString();
    }
    
    directorScene() {
        cc.director.loadScene('game');
        cc.audioEngine.playEffect(this.btnAudio, false);
    }

    start () {

    }

    // update (dt) {}
}
