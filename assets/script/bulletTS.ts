const { ccclass, property } = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    @property
    speed: number = 800;

    @property(cc.NodePool)
    pool: cc.NodePool = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    reuse(pool) {
        this.pool = pool;
    }

    onCollisionEnter(other, self) {
        this.pool.put(this.node);
    }

    update(dt) {
        this.node.y += this.speed * dt;
        if (this.node.y > 800) {
            this.pool.put(this.node);
        }
    }

    // start () {
    // }

    // update (dt) {}
}
