// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
import EnemyMGR from "./enemy-mgrTS";
import GameMgr from "./gameMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    @property(cc.Label)
    hpLab: cc.Label = null
    @property
    touchRadius: number = 0
    @property(cc.AudioClip)
    playerAudio: cc.AudioClip = null;
    @property(cc.AudioClip)
    enemyAudio: cc.AudioClip = null;

    dir: number = 0
    speed_x: number = 0
    speed_y: number = 0
    hp: number = 0

    game: EnemyMGR;


    onLoad() {
        this.dir = Math.random() > 0.5 ? 1 : -1;
        this.speed_x = 50 + Math.floor(120 * Math.random());
        this.speed_y = 20 + Math.floor(50 * Math.random());
        this.hp = 40 + Math.floor(100 * Math.random());

    }

    getPlayerDistance() {
        // Determine the distance according to the position of the Player node
        let playerPos = this.game.player.getPosition();
        // Calculate the distance between two nodes according to their positions
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    }

    start() {
        // this.hpLab = this.node.getComponentInChildren(cc.Label);
        this.hpLab.string = this.hp + '';
    }

    clean() {
        this.node.destroy();
    }

    onCollisionEnter(other, self) {
        this.hp -= 5;
        if (this.hp < 0) {
            this.hp +=20
            this.node.getComponent(cc.Animation).play();
            cc.audioEngine.playEffect(this.enemyAudio, false);
            this.game.increaseTime()
            this.game.gainScoreCurent();
            this.scheduleOnce(() => {
                this.node.destroy();
            }, 0.2)
        }
        this.hpLab.string = this.hp + '';
    }


    update(dt) {
        this.node.x += this.speed_x * dt * this.dir;
        if (this.node.x < -cc.winSize.width / 2 + this.node.width / 2) this.dir = 1;
        if (this.node.x > cc.winSize.width / 2 - this.node.width / 2) this.dir = -1;

        this.node.y -= this.speed_y * dt;
        if (this.node.y < -800) this.node.y = 800;
        if (this.getPlayerDistance() < this.touchRadius) {
            this.node.active = false
            this.game.player.getComponent(cc.Animation).play()
            cc.audioEngine.playEffect(this.playerAudio, false);
            GameMgr.isLoadOverGame = true
            this.scheduleOnce(() => {
                GameMgr.isLoadScene = true;
                cc.director.loadScene('gameOver');
            }, 0.2)
            this.node.active = false
            // return;
        }
    }

    // update (dt) {}
}
