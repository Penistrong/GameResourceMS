
// 游戏的画布
$(document).ready(function(){
	$("#query-game-info").click(function(){
		
		console.log("game");
		// 加载游戏使用到的图片
		var gameImage = new Image();
		gameImage.src = "http://localhost:8080/GameResourceMS/resource/image/505/game.png";

		var logo = new Image();
		logo.src = "http://localhost:8080/GameResourceMS/resource/image/505/logo.png";

		var over = new Image();
		over.src = 'http://localhost:8080/GameResourceMS/resource/image/505/over.png';

		var kaishi = new Image();
		kaishi.src = 'http://localhost:8080/GameResourceMS/resource/image/505/start.png';

		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		
            ctx.save();
            ctx.font="20px Verdana";
            ctx.fillText("X: 攻击   C: 跳跃   左箭头: 后退   右箭头: 前进", 190, 210);
            ctx.drawImage(logo,
                    0, 0, 442, 94,
                    180, 40, 442 ,94
                );

                ctx.drawImage(kaishi,
                    0, 0, 442, 94,
                    220, 130, 442 ,94
                );
            ctx.restore();





/**
 * Boss
 * canvas 画布
 */
function Boss(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.init();
}

Boss.config = {}
Boss.type = [
    { 
        WIDTH: 48,     // 宽600
        HEIGHT: 29,     // 高12像素
        POS: [410, 735, 10, 190],      // boss的活动范围
        IMG: {x: 180, y: 3},    // Boss在图上的位置
        SPEED: 1.5,
        MOUSEHEIGHT: {x: 0, y: 17},
        HP: 1, // boss的血量
        FLY_TIME: 30
    },
    {
        WIDTH: 48,     // 宽600
        HEIGHT: 39,     // 高12像素
        POS: [410, 735, 10, 190],      // boss的活动范围
        IMG: {x: 134, y: 3},    // Boss在图上的位置
        SPEED: 1.5,
        MOUSEHEIGHT: {x: 0, y: 17},
        HP: 1, // boss的血量
        FLY_TIME: 30
    }
]

Boss.prototype = {
    // 在canvas上绘制Boss
    draw: function() {
        this.ctx.drawImage(gameImage,
            Boss.config.IMG.x, Boss.config.IMG.y, Boss.config.WIDTH, Boss.config.HEIGHT,
            this.xPos, this.yPos, Boss.config.WIDTH, Boss.config.HEIGHT
        );
        this.ctx.font = "13px Verdana";
        this.ctx.fillText('HP: ' + this.hp, this.xPos, this.yPos - 10);
        
    },
    // 初始化boss
    init: function() {
        this.type = 0;
        Boss.config = Boss.type[0]
        this.timer = 0;
        this.hp = Boss.config.HP;
        // 在y轴上的位置
        this.yPos = randomNumBoth(Boss.config.POS[2], Boss.config.POS[3]);
        // 在x轴上的位置
        this.xPos = randomNumBoth(Boss.config.POS[0], Boss.config.POS[1]);
        this.box = new AABB(this.xPos, this.yPos, Boss.config.WIDTH, Boss.config.HEIGHT, this.type);
        this.nextPos(); // 下一个位置
        this.draw();
    },
    update: function(time, trex) {
        if(this.hp <= 0) {
            this.ctx.fillText('嘻嘻！ ˇ＾ˇ)', this.xPos, this.yPos - 25);
            trex.ctx.fillText('what！ O_o', trex.xPos, trex.yPos - 25);
            trex.ctx.fillText('|||', trex.xPos, trex.yPos + 10);
        }
        this.timer = time;
        if(isOdd(Math.floor(this.timer / Boss.config.FLY_TIME))) {
            Boss.config = Boss.type[0]
        }else {
            Boss.config = Boss.type[1]
        }
        this.yPos += this.yIncrement;
        this.xPos += this.xIncrement;
        this.yPos = Math.ceil(this.yPos * 10) / 10;
        this.xPos = Math.ceil(this.xPos * 10) / 10;
        this.box.setXY(this.xPos, this.yPos);
        if(absolute(this.nextXPos - this.xPos) < 1 || absolute(this.nextYPos - this.yPos) < 1) {
            this.nextPos();
        }
        this.draw();
    },
    nextPos: function() {
        // 在boss的活动范围内随机生成下一个位置
        this.nextXPos = randomNumBoth(Boss.config.POS[0], Boss.config.POS[1]);
        this.nextYPos = randomNumBoth(Boss.config.POS[2], Boss.config.POS[3]);
        var t = getS({x: this.nextXPos, y: this.nextYPos}, {x: this.xPos, y:this.yPos}) / Boss.config.SPEED;
        // 每 t 内 xPos 和 yPos 的增量
        this.xIncrement = Math.ceil((this.nextXPos - this.xPos) / t * 10) / 10;
        this.yIncrement = Math.ceil((this.nextYPos - this.yPos) / t * 10) / 10;
        this.shoot();
    },
    shoot: function() {
        Bullet.creat(this.canvas, {x: Boss.config.MOUSEHEIGHT.x + this.xPos, y: Boss.config.MOUSEHEIGHT.y + this.yPos}, -1, 0);
    }
}
/**
 * 恐龙
 * canvas 画布
 */
function Trex(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.init();
}

Trex.config = {
    JUMP_INITV: -18,     // 起跳初速度
    G: 1,                // 重力加速度
    BOTTOM_YPOS: 193,    // 恐龙与地面的接触位置
    SPEED: 4,             // 移动速度
    HP: 10,  // 恐龙的血量
    RUN_TIME: 4
}

Trex.type = {
    CRASHED: {
        NAME: 'CRASHED', // 死亡
        WIDTH: 44,        // 死亡时的宽度
        HEIGHT: 47,      // 死亡时的高度
        IMG: {x: 1068, y: 3}, // 死亡状态在图中的位置
    },
    STATICING: {
        NAME: 'STATICING', // 静止
        WIDTH: 44,        // 静止时的宽度
        HEIGHT: 47,      // 静止时的高度
        MOUSEHEIGHT: 40, // 嘴的高度 子弹发射口的高度
        IMG1: {x: 848, y: 3}, // 静止1状态在图中的位置
        IMG2: {x: 892, y: 3}, // 静止2状态在图中的位置
        IMG_TIMING: 3000, // 静止时 图片切换时间 用于眨眼
        BLINK_TIMING: 100, // 眨眼瞬间的时间
        MOUSEHEIGHT: {x: 20, y: 12},
        IMG: {x: 848, y: 3}
    },
    RUNNING: {
        NAME: 'RUNNING',   // 前进
        WIDTH: 44,        // 前进时的宽度
        HEIGHT: 47,      // 前进时的高度
        MOUSEHEIGHT: 40, // 嘴的高度 子弹发射口的高度
        IMG1: {x: 980, y: 3},  // 前进状态在图中的位置
        IMG2: {x: 936, y: 3}, // 前进状态在图中的位置
        IMG_TIMING: 100,        // 奔跑时图片切换的时间
        MOUSEHEIGHT: {x: 20, y: 12},
        IMG: {x: 980, y: 3},
    },
    DUCKING: {
        NAME: 'DUCKING', // 闪避
        WIDTH: 59,        // 闪避时的宽度
        HEIGHT: 47,      // 闪避时的高度
        MOUSEHEIGHT: 40,  // 嘴的高度 子弹发射口的高度
        IMG1: {x: 1111, y: 3},  // 前进状态在图中的位置
        IMG2: {x: 1170, y: 3}, // 前进状态在图中的位置
        IMG_TIMING: 100,
        MOUSEHEIGHT: {x: 45, y: 30},
        IMG: {x: 1111, y: 3}
    },
    // SHOOTING: {
    //     NAME: 'SHOOTING',// 发射
    //     WIDTH: 44,        // 发射时的宽度
    //     HEIGHT: 47,      // 发射时的高度
    //     MOUSEHEIGHT: 40  // 嘴的高度 子弹发射口的高度
    // }
}

Trex.prototype = {
    draw: function() {
        this.ctx.drawImage(gameImage,
            this.config.IMG.x, this.config.IMG.y, this.config.WIDTH, this.config.HEIGHT,
            this.xPos, this.yPos, this.config.WIDTH, this.config.HEIGHT
        )
        this.ctx.font = "13px Verdana";
        this.ctx.fillText('HP: ' + this.hp, this.xPos, this.yPos - 10);
    },
    init: function() {
        this.type = 1;
        this.timer = 0; // 记录各种动画切换的计时器
        this.hp = Trex.config.HP;
        this.xPos = 100;
        this.yPos = Trex.config.BOTTOM_YPOS;
        this.config = Trex.type.STATICING;
        this.box = new AABB(this.xPos, this.yPos, this.config.WIDTH, this.config.HEIGHT, this.type);
        this.jumpV = Trex.config.JUMP_INITV;
        this.isJumping = false;
        this.timer = 0;
        // debug 这里缺少动画
        this.stateMap = {
            JUMPING: 'STATICING',
            WAITING: 'STATICING',
            GOING: 'STATICING',
            BACKING: 'STATICING',
            DUCKING: 'STATICING'
        }
        // 控制前进后退的行为栈，WATING为默认行为，永远执行栈顶的行为；
        this.actionState = ['WATING'];
        // 闪避射击跳跃的功能行为栈，
        this.funcState = [];
        this.draw();
    },
    update: function(time) {
        if(this.hp <= 0) {
            gameState = 'OVER';
        }
        this.timer = time;
        // 为actionState栈顶的行为
        var tmpActionState = this.actionState[this.actionState.length - 1];
        // 为funcState栈顶的行为
        var tmpFuncState = this.funcState[this.funcState.length - 1];
        this.actionFsm(tmpActionState);
        this.funcFsm(tmpFuncState);
        if(tmpFuncState != 'JUMPING' && (tmpActionState == 'GOING' || tmpActionState == 'BACKING')) {
            if(isOdd(Math.floor(this.timer / Trex.config.RUN_TIME))) {
                Trex.type.RUNNING.IMG = Trex.type.RUNNING.IMG1;
                this.config =  Trex.type.RUNNING;
            }else {
                Trex.type.RUNNING.IMG = Trex.type.RUNNING.IMG2;
                this.config =  Trex.type.RUNNING;
            }
        }else {
            this.config =  Trex.type.STATICING;
        }
        this.box.setXY(this.xPos, this.yPos)
        this.draw();
    },
    // 将行为push到栈顶，并执行
    setState: function(stateType, state) {
        this.config = Trex.type[this.stateMap[state]];
        this[stateType].push(state);
    },
    // 当按键弹起时，将起对应的行为删掉
    delState: function(name, state) {
        // 同事删除其栈中的行为
        for(var i = 0, len = this[name].length; i < len; i ++) {
            if(state == this[name][i]) {
                this[name].splice(i, 1);
            }
        }
        // console.log(this.funcState);
    },
    // 行为状态机
    actionFsm: function(actionState) {
        switch(actionState) {
            case 'GOING':
                this.go();
                break;
            case 'BACKING':
                this.back();
                break;
            case 'WAITING':
                this.wait();
                break;
        }
    },
    // 功能状态机
    funcFsm: function(funcState) {
        switch(funcState) {
            case 'JUMPING':
                this.jump();
                break;
            case 'DUCKING':
                this.duck();
                break;
        }
    },
    wait: function() {
        // console.log('waitting');
    },
    crash: function() {
        
    },
    go: function() {
        this.xPos += Trex.config.SPEED;
    },
    back: function() {
        this.xPos -= Trex.config.SPEED;
    },
    jump: function() {
        this.isJumping = true;
        if(this.isJumping) {
            this.jumpV += Trex.config.G;
            this.yPos += this.jumpV;
        }
        if(this.yPos >= Trex.config.BOTTOM_YPOS) {
            this.yPos = Trex.config.BOTTOM_YPOS;
            this.jumpV = Trex.config.JUMP_INITV;
            this.isJumping = false;
            this[67] = true;
            this.delState('funcState', 'JUMPING');
        }
        
    },
    shoot: function() {
        Bullet.creat(this.canvas, {x: this.config.MOUSEHEIGHT.x + this.xPos, y: this.config.MOUSEHEIGHT.y + this.yPos}, 1, 1);
    },
    duck: function() {
        // console.log('duckting');
    }
    
}


/**
 * 子弹的画布
 * canvas 画布
 */
function Bullet(canvas, initPos, dir, type) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.b_xPos = initPos.x;
    this.b_yPos = initPos.y;
    this.dir = dir;
    this.type = type;
    this.config = Bullet.types[this.type];
    this.box = new AABB(this.b_xPos, this.b_yPos, this.config.WIDTH, this.config.HEIGHT, this.type);
}

Bullet.config = {};

Bullet.types = [
    {
        WIDTH: 10,
        HEIGHT: 4,
        IMG: {x: 5, y: 5},
        SPEED: 5 
    },
    {
        WIDTH: 4,
        HEIGHT: 4,
        IMG: {x: 65, y: 7},
        SPEED: 5
    }
]

Bullet.bullets = [];
Bullet.prototype = {
    // 在canvas上绘制子弹
    draw: function() {
        this.ctx.drawImage(gameImage,
            this.config.IMG.x, this.config.IMG.y,this.config.WIDTH, this.config.HEIGHT,
            this.b_xPos, this.b_yPos, this.config.WIDTH, this.config.HEIGHT
        )
    },
    move: function() {
        this.b_xPos += this.config.SPEED * this.dir;
    }
}
Bullet.creat = function(canvas, bPos, dir, type) {
    Bullet.bullets.push(new Bullet(canvas, bPos, dir, type)); 
}
Bullet.update = function(trex, boss) {
    var len = Bullet.bullets.length;
    if(len == 0) {
        return;
    }
    if(Bullet.bullets[0].b_xPos > 800){
        Bullet.bullets.shift();
    }
    for(var i = 0; i < Bullet.bullets.length; i ++) {
        Bullet.bullets[i].move();
        Bullet.bullets[i].box.setXY(Bullet.bullets[i].b_xPos, Bullet.bullets[i].b_yPos);
        Bullet.bullets[i].draw();
        if(Bullet.bullets[i] && boxCompare(trex.box, Bullet.bullets[i].box)) {
            trex.hp -= 1;
            Bullet.bullets.splice(i, 1);
        }
        if(Bullet.bullets[i] && boxCompare(boss.box, Bullet.bullets[i].box)) {
            boss.hp -= 1;
            Bullet.bullets.splice(i, 1);
        }
    }
}

/**
 * 分割线的仙人掌 
 * canvas 画布
 */
function Cacti(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.init();
}

Cacti.config = {
    SPLIT_POS: 400,            // 分割线，总宽的一半
    TYPES_RATIO: 0.5           // 分割线的系数
}

Cacti.types = [
    {
        WIDTH: 50,             // 宽12
        HEIGHT: 35,            // 高35像素
        XPOS: 400,             // 在x轴的位置
        YPOS: 205,             // 在Y轴的位置
        IMG: {x: 228, y: 3},   // 在图上的位置
    },
    {
        WIDTH: 50,             // 宽12
        HEIGHT: 50,            // 高35像素
        XPOS: 400,             // 在x轴的位置
        YPOS: 190,             // 在Y轴的位置
        IMG: {x: 430, y: 3},   // 地面在图上的位置
    }
]

Cacti.prototype = {
    // 在canvas上绘制仙人掌
    draw: function() {
        this.ctx.drawImage(gameImage,
            Cacti.config.CACTI_TYPE.IMG.x, Cacti.config.CACTI_TYPE.IMG.y, Cacti.config.CACTI_TYPE.WIDTH, Cacti.config.CACTI_TYPE.HEIGHT,
            Cacti.config.CACTI_TYPE.XPOS - (Cacti.config.CACTI_TYPE.WIDTH / 2), Cacti.config.CACTI_TYPE.YPOS, Cacti.config.CACTI_TYPE.WIDTH, Cacti.config.CACTI_TYPE.HEIGHT
        )
    },
    // 获得随机类型的仙人掌
    init: function() {
        Cacti.config.CACTI_TYPE = Math.random() > Cacti.config.TYPES_RATIO ? Cacti.types[0] : Cacti.types[1];
        this.draw();
    }
}

/**
 * 云朵
 * canvas 画布
 */
function Cloud(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.init();
}

Cloud.config = {
    WIDTH: 46,           // 云朵的宽度
    HEIGHT: 14,          // 云朵的高度
    IMG: {x: 88, y: 3},  // 云朵在图中的位置
    MAX_BASE_HEIGHT: 30, // 云朵离地面的最大高度
    MIN_BASE_HEIGHT: 71, // 云朵离地面的最小高度
    MAX_GAP: 300,        // 云朵之间的最大间隔
    MIN_GAP: 100,        // 云朵之间的最小间隔
}
// 用于存储云朵
Cloud.clouds = [];

Cloud.prototype = {
    // 在canvas上绘制云朵
    draw: function() {
        this.ctx.drawImage(gameImage,
            Cloud.config.IMG.x, Cloud.config.IMG.y, Cloud.config.WIDTH, Cloud.config.HEIGHT,
            this.xPos, this.yPos, Cloud.config.WIDTH, Cloud.config.HEIGHT
        )
    },
    // 实例化云朵时的初始参数
    init: function() {
        this.xPos = 800 + Cloud.config.WIDTH;
        this.yPos = randomNumBoth(Cloud.config.MAX_BASE_HEIGHT, Cloud.config.MIN_BASE_HEIGHT);
        this.cloudGap = randomNumBoth(Cloud.config.MIN_GAP,Cloud.config.MAX_GAP)
        this.spead = 1;
    },
    // 更新canvas上云朵的位置
    update: function() {
        // 当没有云朵的时候，绘制一个云朵
        if(Cloud.clouds.length == 0) {
            return this.creat();
        }
        // 当云朵移出屏幕外的时候，删掉这个云朵
        if(Cloud.clouds[0].xPos < -Cloud.config.WIDTH) {
            Cloud.clouds.shift();
        }
        var len = Cloud.clouds.length;
        // 当最后一个云朵大于其云朵间距的时候，生成一个云朵
        if(800 - Cloud.clouds[len-1].xPos > Cloud.clouds[len-1].cloudGap) {
            this.creat();
        }
        // 循环这些云朵数组，绘制他们的云朵
        for(var i = 0; i < len; i ++) {
            Cloud.clouds[i].xPos = Cloud.clouds[i].xPos - Cloud.clouds[i].spead;
            Cloud.clouds[i].draw();
        }
    },
    // 存储云朵的数组中添加一个云朵
    creat: function() {
        Cloud.clouds.push(new Cloud(this.canvas));
    }
}

/**
 * 地板
 * canvas 画布
 */
function Floor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.init();
}

Floor.config = {
    WIDTH: 800,     // 宽600
    HEIGHT: 12,     // 高12像素
    YPOS: 227,      // 在Y轴的位置
    IMG: {y: 54}    // 地面在图上的位置
}

Floor.prototype = {
    // 在canvas上绘制地板
    draw: function() {
        this.ctx.drawImage(gameImage,
            Floor.config.IMG.x, Floor.config.IMG.y, Floor.config.WIDTH, Floor.config.HEIGHT,
            0, Floor.config.YPOS, Floor.config.WIDTH, Floor.config.HEIGHT
        )
    },
    init: function() {
        Floor.config.IMG.x = randomNumBoth(2, 402);
        this.draw();
    }
}


var gameState = 'WAITING';

function start() {
    // 注册键盘事件，完成对角色的控制
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    var floor = new Floor(canvas);
    var cacti = new Cacti(canvas);
    var cloud = new Cloud(canvas);
    var trex = new Trex(canvas);
    var boss = new Boss(canvas);

    trex[37] = true;
    trex[67] = true;
    trex[39] = true;
    trex[40] = true;
    trex[88] = true;
    function onKeyDown(e) {
        switch(e.keyCode){
            case 37:
                if(trex[e.keyCode]) {
                    trex[e.keyCode] = false;
                    trex.setState('actionState', 'BACKING');
                }
                break;
            case 67:
                if(trex[e.keyCode]) {
                    trex[e.keyCode] = false;
                    trex.setState('funcState', 'JUMPING');
                }
                break;
            case 39:
                if(trex[e.keyCode]) {
                    trex[e.keyCode] = false;
                    trex.setState('actionState', 'GOING');
                }
                break;
            case 40:
                if(trex[e.keyCode]) {
                    trex[e.keyCode] = false;
                    trex.setState('funcState', 'DUCKING');
                }
                break;
            case 88:
                if(trex[e.keyCode]) {
                    trex[e.keyCode] = false;
                    trex.shoot();
                }
                break;
        }
    }

    function onKeyUp(e) {
        switch(e.keyCode){
            case 37:
                trex[e.keyCode] = true;
                trex.delState('actionState', 'BACKING');
                break;
            // case 38:
            //     trex[e.keyCode] = true;
            //     trex.delState('funcState', 'JUMPING');
            //     break;
            case 39:
                trex[e.keyCode] = true;
                trex.delState('actionState', 'GOING');
                break;
            case 40:
                trex[e.keyCode] = true;
                trex.delState('funcState', 'DUCKING');
                break;
            case 88:
                trex[e.keyCode] = true;
                break;
        }
    }

    var timer = 0;
    (function draw(time) {
        timer ++;
        // time 大约16ms 两帧间隔时间
        ctx.clearRect(0,0,800,250);
        
        // h.update(time - startTime,3);
        // startTime = time;
        // 绘制完成后不会改变的图像 用draw方法
        floor.draw();
        cacti.draw();
        // 绘制完成后会改变的图像 用update方法
        cloud.update();
        trex.update(timer);
        boss.update(timer, trex);
        Bullet.update(trex, boss);
        if(gameState == 'OVER') {
            return this.ctx.drawImage(over, 0, 0, 500, 98, 160, 70, 500, 98);
        }
        window.requestAnimFrame(draw);
    })();
}
function GameStart(e) {
    if(gameState == 'WAITING' && e.keyCode == 13) {
        gameState = 'RUNNING';
        start();
    }
}

document.addEventListener('keydown', GameStart);

//大约16ms 两帧间隔时间
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback, element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

// 指定范围的随机整数
function randomNumBoth(min,max){
    var range = max - min;
    var rand = Math.random();
    var num = min + Math.round(rand * range); //四舍五入
    return num;
}

// 取绝对值
function absolute(x) {
    return x >= 0 ? x : -x;
}

// 获取两点之间的距离
function getS(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) +  Math.pow(pos1.y - pos2.y, 2));
}

// 判断是否为偶数
function isOdd(num) {
    if((num % 2) == 1){
        return false;
    }
    return true;
}

var gameState = 'WAITING';

function start() {
    // 注册键盘事件，完成对角色的控制
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    var floor = new Floor(canvas);
    var cacti = new Cacti(canvas);
    var cloud = new Cloud(canvas);
    var trex = new Trex(canvas);
    var boss = new Boss(canvas);

    trex[37] = true;
    trex[67] = true;
    trex[39] = true;
    trex[40] = true;
    trex[88] = true;
    function onKeyDown(e) {
        switch(e.keyCode){
            case 37:
                if(trex[e.keyCode]) {
                    trex[e.keyCode] = false;
                    trex.setState('actionState', 'BACKING');
                }
                break;
            case 67:
                if(trex[e.keyCode]) {
                    trex[e.keyCode] = false;
                    trex.setState('funcState', 'JUMPING');
                }
                break;
            case 39:
                if(trex[e.keyCode]) {
                    trex[e.keyCode] = false;
                    trex.setState('actionState', 'GOING');
                }
                break;
            case 40:
                if(trex[e.keyCode]) {
                    trex[e.keyCode] = false;
                    trex.setState('funcState', 'DUCKING');
                }
                break;
            case 88:
                if(trex[e.keyCode]) {
                    trex[e.keyCode] = false;
                    trex.shoot();
                }
                break;
        }
    }

    function onKeyUp(e) {
        switch(e.keyCode){
            case 37:
                trex[e.keyCode] = true;
                trex.delState('actionState', 'BACKING');
                break;
            // case 38:
            //     trex[e.keyCode] = true;
            //     trex.delState('funcState', 'JUMPING');
            //     break;
            case 39:
                trex[e.keyCode] = true;
                trex.delState('actionState', 'GOING');
                break;
            case 40:
                trex[e.keyCode] = true;
                trex.delState('funcState', 'DUCKING');
                break;
            case 88:
                trex[e.keyCode] = true;
                break;
        }
    }

    var timer = 0;
    (function draw(time) {
        timer ++;
        // time 大约16ms 两帧间隔时间
        ctx.clearRect(0,0,800,250);
        
        // h.update(time - startTime,3);
        // startTime = time;
        // 绘制完成后不会改变的图像 用draw方法
        floor.draw();
        cacti.draw();
        // 绘制完成后会改变的图像 用update方法
        cloud.update();
        trex.update(timer);
        boss.update(timer, trex);
        Bullet.update(trex, boss);
        if(gameState == 'OVER') {
            return ctx.drawImage(over, 0, 0, 500, 98, 160, 70, 500, 98);
            if(gameState == 'OVER' && e.keyCode == 13) {
                gameState = 'RUNNING';
                start();
            }
        }
        window.requestAnimFrame(draw);
    })();
}
function GameStart(e) {
    if(gameState == 'WAITING' && e.keyCode == 13) {
        gameState = 'RUNNING';
        start();
    }
}

document.addEventListener('keydown', GameStart);

//AABB盒模型
function AABB(x, y, w, h, type) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.type = type;
}

AABB.prototype = {
    setXY: function(x, y) {
        this.x = x;
        this.y = y;
    }
}

// 碰撞检测
function boxCompare(AA, BB) {
    if(AA.type == BB.type) {
        return false;
    }
    var AAX = AA.x;
    var AAY = AA.y;
    var BBX = BB.x;
    var BBY = BB.y;
 
    return AAX < BBX + BB.width && AAX + AA.width > BBX && AAY < BBY + BB.height && AA.height + AAY > BBY;
    
    
}

	})
	
	
})