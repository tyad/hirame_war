enchant();

window.onload = function hirame_war() {
	var game = new Game(512, 512);
	game.preload('img/hirame.gif');
	game.preload('img/hirameS.png');
	game.preload('img/title.png');
	game.preload('img/background.jpg');
	game.preload('img/clearbackground.jpg');
	game.preload('img/clear.png');
	game.preload('sound/screem.wav');
	game.preload('sound/huzisan.wav');
	game.preload('sound/omedetou.wav');
	game.onload = function () {
		var scenetitle = new Scene(); //タイトル画面
		var scene1 = new Scene(); //会話画面
		var scene2 = new Scene(); //ゲーム画面
		var sceneclear = new Scene(); //クリア画面
		/*タイトル*/
		Title = new Sprite(512,512);
		Title.image = game.assets['img/title.png'];
		scenetitle.addChild(Title);
		var Startbutton = new Label();
		Startbutton.x = 100;
		Startbutton.y = 300;
		Startbutton.text = "<h1 class='button'>スタート</h1>";
		Startbutton.addEventListener('touchstart', function (e) {
			game.popScene(scenetitle);
			game.pushScene(scene1);
			game.assets['sound/huzisan.wav'].play();
		});
		scenetitle.addChild(Startbutton);

		/*会話*/
		BackGround = new Sprite(512,512);
		BackGround.image = game.assets['img/background.jpg'];
		scene1.addChild(BackGround);
		HirameS = new Sprite(450, 450);
		HirameS.image = game.assets['img/hirameS.png'];
		HirameS.x = 20;
		HirameS.y = -100;
		scene1.addChild(HirameS);
		var message = new Label();
		message.y = 340;
		message.text = "<h1 class='mes'>フジサン、ヨコセ。<br><br>#ここをクリックでゲームスタート#</h1>";
		message.addEventListener('touchstart', function (e) {
			game.popScene(scene1);
			game.pushScene(scene2);
		});
		scene1.addChild(message);

		/*ゲームメイン*/
		GameBackGround = new Sprite(512,512);
		GameBackGround.image = game.assets['img/background.jpg'];
		scene2.addChild(GameBackGround);
			var HirameNum = 10;
			var Hirame = Array(HirameNum);
			var clearswitch = new Label();
			/*時間オブジェクト*/
			clearswitch.x = 5;
			clearswitch.y = 5;
			clearswitch.time = 0;
			clearswitch.text = clearswitch.time + "秒";
			clearswitch.addEventListener('enterframe', function () {
				if (HirameNum == 0) {
					game.popScene(scene2);
					var cleartime = new Label();
					cleartime.x = 100;
					cleartime.y = 250;
					cleartime.text = "<h1 style='color:yellow; font-size:30px; text-align:center;'>クリアタイム：" + clearswitch.time + "秒</h1>";
					sceneclear.addChild(cleartime);
					game.assets['sound/omedetou.wav'].play();
					game.pushScene(sceneclear);
				}
				if (game.frame % game.fps == 0) {
					clearswitch.time++;
					clearswitch.text = clearswitch.time + "秒";
				}
			});
			scene2.addChild(clearswitch);
		/*キャラオブジェクト*/
		for (i = 0; i < HirameNum; i++){
			Hirame[i] = new Sprite(32, 32);
			Hirame[i].image = game.assets['img/hirame.gif'];
			Hirame[i].x = Math.floor(Math.random() * game.width);
			Hirame[i].y = Math.floor(Math.random() * game.height);
			Hirame[i].xdirection = 1;
			Hirame[i].ydirection = 1;
			Hirame[i].addEventListener('enterframe', function(){
				if (this.action == "disapear"){
					this.time++;
					if (this.time >= 15) {
						scene2.removeChild(this);
						game.assets['sound/screem.wav'].play();
						HirameNum--;
					}
					return;
				}
				this.x += Math.floor(Math.random() * 2) * this.xdirection;
				this.y += Math.floor(Math.random() * 2) * this.ydirection;
				if (game.frame % 20 == 0) {
					if (Math.round(Math.random()) == 1){
						this.xdirection *= -1;
						this.scaleX *= -1;
					}
					if (Math.round(Math.random()) == 1){
						this.ydirection *= -1;
					}
				}
				if (this.x + this.width > game.width){
					this.xdirection = -1;
					this.scaleX = -1;
				}
				if (this.y + this.height > game.height){
					this.ydirection = -1;
				}
				if (this.x <= 0){
					this.xdirection = 1;
					this.scaleX = 1;
				}
				if (this.y <= 0){
					this.ydirection = 1;
				}
				if (game.frame % 3 == 0){
					this.frame++;
				}
			});
			//クリックした時
			Hirame[i].addEventListener('touchstart', function (e) {
				var disa = new Label();
				disa.text = '<div>あー</div>';
				disa.x = this.x;
				disa.y = this.y - 10;
				disa.time = 0;
				disa.addEventListener('enterframe', function () {
					this.y--;
					this.time++;
					if (this.time >= 15) {
						scene2.removeChild(this);
					}
				});
				scene2.addChild(disa);
				this.action = "disapear"
				this.opacity = 0.5;
				this.time = 0;
			});
			scene2.addChild(Hirame[i]);
		}

		/*クリア画面*/
		var ClearBackGround = new Sprite(512,512);
		ClearBackGround.image = game.assets['img/clearbackground.jpg'];
		sceneclear.addChild(ClearBackGround);
		var Clear = new Sprite(341,99);
		Clear.image = game.assets['img/clear.png'];
		Clear.x = 85;
		Clear.y = 90;
		sceneclear.addChild(Clear);
		var Returntitle = new Label();
		Returntitle.x = 100;
		Returntitle.y = 300;
		Returntitle.text = "<h1 class='button'>タイトルに戻る</h1>";
		Returntitle.addEventListener('touchstart', function (e) {
			window.location.reload();
		});
		sceneclear.addChild(Returntitle);

		game.pushScene(scenetitle);
	};
	game.start();
};
