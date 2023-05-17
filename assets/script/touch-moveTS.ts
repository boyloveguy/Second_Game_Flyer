// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GameMgr from "./gameMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TouchMove extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Prefab)
    enemy: cc.Prefab = null;

    @property(cc.Node)
    enemyMGR: cc.Node = null;

    @property(cc.Node)
    bulletMGR: cc.Node = null;

    @property(cc.Node)
    displayCurent: cc.Node = null;

    @property(cc.Node)
    nameGame: cc.Node = null;

    @property(cc.AudioClip)
    bgAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    btnPlayAudio: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:


    onLoad() {
        cc.audioEngine.stopAll();
        cc.audioEngine.playEffect(this.bgAudio, true);
    }

    stopAction() {
        if (GameMgr.isFirstLoad) {
            this.enemyMGR.active = false;
            this.player.active = false;
            this.bulletMGR.active = false;
            this.displayCurent.active = false;
            this.node.getChildByName('EnemyManager').active = false;
        } else {
            this.enemyMGR.active = true;
            this.player.active = true;
            this.bulletMGR.active = true;
            this.displayCurent.active = true;
            this.node.getChildByName('EnemyManager').active = true;
            this.node.getChildByName('btn Play').active = false;
            this.nameGame.active = false;
        }
    }


    start() {
        this.stopAction()
        this.node.on('touchmove', (e) => {
            let delta = e.getDelta();
            this.player.x += delta.x;
            this.player.y += delta.y;
        }, this);
        this.node.emit('btnPlay', 'this.directorScene()');
    }

    directorScene() {
        this.enemyMGR.active = true;
        this.player.active = true;
        this.bulletMGR.active = true;
        this.displayCurent.active = true;
        this.node.getChildByName('btn Play').active = false;
        this.nameGame.active = false;
        cc.audioEngine.playEffect(this.btnPlayAudio, false);
        this.node.getChildByName('EnemyManager').active = true;
        GameMgr.isFirstLoad = false;
    }

    update(dt) {
        if (this.player.x < -cc.winSize.width / 2) {
            this.player.x = -cc.winSize.width / 2;
        } else if (this.player.x > cc.winSize.width / 2) {
            this.player.x = cc.winSize.width / 2;
        }
        if (this.player.y < -cc.winSize.height / 2) {
            this.player.y = -cc.winSize.height / 2;
        } else if (this.player.y > cc.winSize.height / 2) {
            this.player.y = cc.winSize.height / 2;
        }
    }
}
