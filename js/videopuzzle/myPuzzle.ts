/// <reference path="../libs/typings/jquery.d.ts" />
/// <reference path="../libs/typings/tweenjs.d.ts" />
/// <reference path="../libs/typings/easeljs.d.ts" />
/// <reference path="Camera.ts" />
/// <reference path="ImageHolder.ts" />
/// <reference path="Puzzles.ts" />
	///images/website-images.jpg
declare var CLICK:string;
module uplight{
	import c = createjs;
  export  class Puzzle {
		view: HTMLDivElement;
		canvas: HTMLCanvasElement;
		private ctx: CanvasRenderingContext2D;
		private img: HTMLImageElement;
		private _timeout: number;
		W: number;
		H: number;

	  private Ws:number= 640;
	  private Hs:number = 480;
	  private D:number;

	  images: HTMLImageElement[];
	  private imageHolder: ImageHolder
	  private camera: Camera
	  public stage: c.Stage;
	  private $btnStart:JQuery;
	  private $btnUseCamera:JQuery;
	  private $selRes:JQuery;
	  private $images:JQuery;
	  private $puzzleOver:JQuery;


		// private stage: createjs.Stage;

		constructor(private $view:JQuery) {
			this.D= this.Hs/this.Ws;
			this.view = < HTMLDivElement>$view.get(0);
			if (this.view) this.init();
		}

		private catImage(): void {
			// this.ctx.drawImage(this.canvas, 0, 0, 300, 300);

		}

		private createButton(label: string): HTMLButtonElement {
			var btn: HTMLButtonElement = document.createElement('button');
			btn.value = label;
			btn.innerText = label;
			return btn;
		}

	  private onCameraReady(video:HTMLVideoElement): void {
		//console.log('onCameraReady '+video.videoWidth+'  '+video.videoHeight);

		  this.imageHolder.createVideo(this.camera.video);
		  c.Ticker.addEventListener('tick', this.stage);

	  }

	  private initTools():void{
			this.$btnStart = this.$view.find('[data-id=btnStart]:first').click(()=>{
			this.engine = new Puzzles(this.stage,this.imageHolder.bmp,this.$selRes.val());
			this.imageHolder.removeImage();
			this.engine.onGameOver = ()=>this.gameOver();
			if (!this.imageHolder.bmp) {
				alert("Please use Camera or select Image");
				return;
			}
			this.isOver = false;
			this.imageHolder.removeImage();
			this.strtTime = new Date().getTime();
			c.Ticker.addEventListener('tick', this.stage);
		});

		  $(window ).on( "orientationchange", ( event ) =>{
			  console.log(' orientationchange '+window.orientation);
			  if(this.camera)this.camera.onDemChanged();

		  });
		this.$btnUseCamera = this.$view.find('[data-id=btnUseCamera]:first').click(()=>{
			if(this.engine)this.engine.destroy();
			if (!this.camera){
				this.camera = new Camera(this.W, this.H);
				this.camera.onCameraReady = (video:HTMLVideoElement)=>this.onCameraReady(video);
			}else this.imageHolder.createVideo(this.camera.video);
		});

		this.$selRes = this.$view.find('[data-id=setResolution]:first').change(()=>{

		});

		  this.$images = this.$view.find('.list:first');

		  var ar: string[] = Array('4x4', '5x5', '6x6','7x7','8x8','10x10');
		  var out:string='';
		  for (var i = 0, n = ar.length; i < n; i++)  out+='<option>' + ar[i] + '</option>';
		  this.$selRes.html(out);

		  $.get('js/videopuzzle/service.php').done((resp) => {

			//  var res:any = JSON.parse(resp);
			 var out:string='';
			//console.log(resp);

			  var ar:string[] = resp;
			  for (var i = 0, n = ar.length; i < n; i++) out+='<img src="'+ar[i]+'" />';
			  this.$images.html(out);
			  this.$images.on(CLICK,'img',(evt:JQueryEventObject)=>{
				  if(this.engine)this.engine.destroy();
				  var el:JQuery= $(evt.currentTarget);
				  var url:string = el.attr('src');
				  this.imageHolder.createImage(url);
				  console.log(url);
				 // this.imageHolder.createImage()
			  });
		  });

	  }
	  private setDemetions():void{

		  this.canvas.height = this.H;
		  this.canvas.width = this.W;
		  this.stage.setBounds(0, 0, this.W, this.H);
	  }

	 /////////////////////////////////////////////////////////////////

	  private init(): void {
			var w:number = screen.width-30;
			var h:number = screen.height-30;
		  if(w<this.Ws) this.W=w;
		  else this.W=this.Ws;

		  if(h<this.Hs) this.H=h;
		  else this.H=this.Hs;



/*
console.log(w+'   '+h);
			if(w<this.Ws){
				if(typeof window.orientation !== 'undefined'){
					if(w>h){
						this.H = h-30;
						this.W = Math.round(this.H/this.D);

					}else{
						this.W = w -30;
						this.H = Math.round(this.W/this.D);
					}
				}else{
					console.log(' window.orientation  '+ window.orientation);
				}


			}else {
				this.W = this.Ws;
				this.H = this.Hs;
			}
*/



			console.log(' after all  '+this.W +'   '+this.H);
			this.canvas = <HTMLCanvasElement> document.getElementById('PuzzleCanvas');
			this.stage = new c.Stage(this.canvas);
			this.ctx = this.canvas.getContext('2d');

			this.setDemetions();
			this.imageHolder = new ImageHolder(this.stage);
			this.initTools();
			this.$puzzleOver = $('#puzzleOver');
			this.$puzzleOver.find('[data-id=btnClose]').click(()=>{
				this.$puzzleOver.fadeOut();
			});

		}
	  private engine: Puzzles;
	  private sratTime: number;
	  private isOver: boolean;
	  private strtTime: number;
	  private gameOver(): void {
		  if (this.isOver) return;
		  this.isOver = true;
		  this.$puzzleOver.find('[data-id=gameMessage]:first').text("game Over in: "+Math.round(((new Date()).getTime()-this.strtTime)/1000)+' sec');
		  this.$puzzleOver.fadeIn();
		  c.Ticker.removeEventListener('tick', this.stage.update);
		  this.engine = null;
	  }

	}


}

