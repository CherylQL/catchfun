define('catchfun/resource', ['hilo/loader/LoadQueue', 'catchfun/mediator'], function(LoadQueue, mediator){

/**
 * @module catchfun/resource
 * @requires hilo/loader/LoadQueue
 * @requires catchfun/mediator
 */
var resource = {
    loadedRes:{},
    res:[
        {id:'xuebacan', src:'src/images/fish.png'},
        {id:'bg', src:'src/images/bg.jpg'},
        {id:'actor',src:'src/images/xuebacan.jpg'}
    ],
    load:function(){
        var res = this.res;
        var loadedRes = this.loadedRes;

        var queue = this.queue = new LoadQueue;
        queue.add(res);

        queue.on("complete", function(){
            var imgs = [];
            for(var i = 0;i < res.length;i ++){
                var id = res[i].id;
                loadedRes[id] = queue.getContent(id);
            }
            mediator.fire("resource:complete");
        });

        queue.on("load", function(d){
            mediator.fire("resource:loaded", {
                num:queue._loaded/(queue._source.length + 1)
            });
        });

        queue.start();
    },
    get:function(id){
        return this.loadedRes[id];
    }
};

return resource;

});