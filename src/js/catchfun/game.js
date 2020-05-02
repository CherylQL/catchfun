define('catchfun/game', ['hilo/view/Stage', 'hilo/util/Ticker', 'hilo/view/Bitmap', 'catchfun/mediator', 'catchfun/resource', 'catchfun/loading'], function(Stage, Ticker, Bitmap, mediator, resource, loading){

/**
 * @module catchfun/game
 * @requires hilo/view/Stage
 * @requires hilo/util/Ticker
 * @requires hilo/view/Bitmap
 * @requires catchfun/mediator
 * @requires catchfun/resource
 * @requires catchfun/loading
 */
var game = {
    Speed:0,
    actor:null,
    bg:null,
    xuebacan:null,
    moveright:true,
    count:0,
    init:function(stageContainer){
        this.stageContainer = stageContainer;
        this.bindEvent();
        loading.start();
        resource.load();
    },
    bindEvent:function(){
        var that = this;
        mediator.on('resource:loaded', function(event){
            loading.loaded(event.detail.num);
        });

        mediator.on('resource:complete', function(){
            that.initGame();
        });
    },
    initGame:function(){
        this._initStage();
        this._initScene();
        // this._initActor();
        mediator.fire('game:init');
        this.ticker.start();
        this.ticker.stop();
    },
    tick:function(dt){
        var speed = 4;
        // console.log(this.count)
        this.xuebacan.y +=3;
        // if(this.actor.x>3)
        // this.actor.x -=3;
        if(this.xuebacan.y > this.stage.height){
            this.xuebacan.y = -this.xuebacan.height;
            // if(Math.sqrt((this.xuebacan.x-this.actor.x)*(this.xuebacan.x-this.actor.x)+(this.xuebacan.y-this.actor.y)*(this.xuebacan.y-this.actor.y))<170){
            //     console.log(Math.sqrt((this.xuebacan.x-this.actor.x)*(this.xuebacan.x-this.actor.x)+(this.xuebacan.y-this.actor.y)*(this.xuebacan.y-this.actor.y)))
            //     this.count++;
            //     console.log(this.count)
            // }
        }
        if(this.moveright){
            this.actor.x += speed;
            if(this.actor.x >= 300){
                this.moveright = false;
                this.actor.x-=3;
                // speed =  Math.floor(Math.random()*20+1);
            }
        }else{
            this.actor.x -= speed;
            if(this.actor.x<=3){
                this.moveright = true;
                // speed =  Math.floor(Math.random()*9+1);
            }
        }
    },
    _initStage:function(){
        var stage = this.stage = new Stage({
            width:500,
            height:400,
            renderType:'canvas',
            container:this.stageContainer
        });
        var ticker = this.ticker = new Ticker(60);
        ticker.addTick(stage);
        ticker.addTick(this);

         //绑定交互事件
        this.stage.enableDOMEvent("POINTER_START", true);
        this.stage.on("POINTER_START", this.onUserInput.bind(this));

        //Space键控制
        if (document.addEventListener) {
            document.addEventListener('mousedown', function(e) {
                console.log(e)
                this.onUserInput(e);
            }.bind(this));
        } else {
            document.attachEvent('onmousedown', function(e) {
            //    console.log(e)
                this.onUserInput(e);
            }.bind(this));
        }
    },
    _initScene:function(){

        var actor = this.actor = new Bitmap({
            x:3,
            y:180,
            image:resource.get('actor'),
            onUpdate:function(){
            }
        });
        var xuebacan = this.xuebacan = new Bitmap({
            // x=3,
            // y=10,
            image:resource.get('xuebacan'),
            rect:[0, 0, 174, 126],
        })
        var bg = this.bg = new Bitmap({
            image:resource.get('bg')
        });

        this.stage.addChild(bg, actor,xuebacan);
    },
    onUserInput:function(e){
        this.moveright = !(this.moveright);
        this.ticker.start();
        console.log(this.actor)
        console.log(this.xuebacan)
    }
};

return game;

});