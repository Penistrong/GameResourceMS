// 游戏的画布
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// 加载游戏使用到的图片
var gameImage = new Image();
gameImage.src = "http://localhost:8080/GameResourceMS/resource/image/505/game.png";

var logo = new Image();
logo.src = "http://localhost:8080/GameResourceMS/resource/image/505/logo.png";

var over = new Image();
over.src = 'http://localhost:8080/GameResourceMS/resource/image/505/over.png';

var kaishi = new Image();
kaishi.src = 'http://localhost:8080/GameResourceMS/resource/image/505/start.png';
