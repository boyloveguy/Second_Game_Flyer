

import Bullet from "./bulletTS";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BulletMGR extends cc.Component {

    @property(cc.Prefab)
    bullet: cc.Prefab = null;

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Node)
    btn: cc.Node = null;

    @property(cc.AudioClip)
    bulletAuido: cc.AudioClip = null;

    pool: cc.NodePool = null
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        this.pool = new cc.NodePool('bulletTS');
        for (let i = 0; i < 100; i++) {
            this.pool.put(cc.instantiate(this.bullet));
        }
    }

    start() {
        this.schedule(this.createManyBullet, 0.4);
    }

    createManyBullet() {
        let px = this.player.x;
        let py = this.player.y + 80;
        let offset = 45;
        this.createOneBullet(px, py);
        this.createOneBullet(px + offset, py);
        this.createOneBullet(px - offset, py);
        cc.audioEngine.playEffect(this.bulletAuido, false);
    }

    createOneBullet(x, y) {
        let b = this.pool.get(this.pool);
        if (!b) {
            this.pool.put(cc.instantiate(this.bullet));
            b = this.pool.get(this.pool);
        }
        b.parent = this.node;
        b.x = x;
        b.y = y;
    }

    // update (dt) {}
}
