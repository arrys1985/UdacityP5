// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = Math.random() * 600;
    this.y = y;
    this.speed = Math.floor(Math.random() * 100 + 100);
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = "images/enemy-bug.png";
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt * this.speed;
    if (this.x > 600) {
        this.x = -50
    }
};
// 此为游戏必须的函数，用来在屏幕上画出敌人
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function (x, y) {
    this.x = 200;
    this.y = 300;
    this.sprite = "images/char-boy.png";
};
//碰撞代码,若与虫子发生碰撞或抵达河边，则自动返回至起始坐标（200,300）
Player.prototype.update = function(dt) {
	var person_x = this.x;
    var person_y = this.y;
    for (var i = 0; i < allEnemies.length; i++) {
        if ((allEnemies[i].x - person_x > -50) && (allEnemies[i].x - person_x < 50) && allEnemies[i].y - person_y == 5) {
            this.x = 200;
            this.y = 300;
        }
    }

    if (this.y < 50) {
        this.x = 200;
        this.y = 300;
    }
};

Player.prototype.handleInput = function(key) {
    if (key == "left" && this.x > 0) this.x -= 100;
    if (key == "right" && this.x <= 300) this.x += 100;
    if (key == "up" && this.y > 0) this.y -= 80;
    if (key == "down" && this.y <= 350) this.y += 80;
};

// 此为游戏必须的函数，用来在屏幕上画出玩家
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [new Enemy(0, 60), new Enemy(0, 145), new Enemy(0, 225)]
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

