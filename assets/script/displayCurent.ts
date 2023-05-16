// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class DisplayCurent extends cc.Component {

    // @property(cc.Label)
    // Time: cc.Label = null;
    
    // @property(cc.Label)
    // Score: cc.Label = null;

    // timeCurent: number = 0;
    // // LIFE-CYCLE CALLBACKS:

    // // onLoad () {}

    // gainTimeCurent(time){
    //     this.Time.getComponent(cc.Label).string = 'Time: ' + time.toString();
    // }

    // gainScoreCurent(score){
    //     this.Score.getComponent(cc.Label).string = 'Score' 
    // }

    // start () {
    //     this.node.active =true;
    // }

    // update (dt) {
    //     this.timeCurent += dt
    //     this.gainTimeCurent(this.timeCurent.toFixed(0));
    // }
}
