const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraBK extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        
        cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .to(10, { position: cc.v2(0, 1440) })
                    .call(() => { this.node.y = 0; })
            ).start();
    }

    // update (dt) {}
}
