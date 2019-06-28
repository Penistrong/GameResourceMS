// 游戏的画布
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// 加载游戏使用到的图片
var gameImage = new Image();
gameImage.src = "./resource/image/505/game.png";

var logo = new Image();
logo.src = "./resource/image/505/logo.png";

var over = new Image();
over.src = './resource/image/505/over.png';

var kaishi = new Image();
kaishi.src = './resource/image/505/start.png';
