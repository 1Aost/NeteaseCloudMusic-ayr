function animate(obj,target,callback) {
    // console.log(callback);   callback=function() {}   调用的时候 callback()
    clearInterval(obj.timer);
    obj.timer=setInterval(function() {
        // let step=Math.ceil((target-obj.offsetLeft)/10);

        let step=(target-obj.offsetLeft)/10;
        step=step>0?Math.ceil(step):Math.floor(step);
        
        if(obj.offsetLeft==target) {
            clearInterval(obj.timer);
            //如果有callback这个参数
            /* if(callback) {
                callback();
            } */
            callback && callback();
        }
        else obj.style.left=obj.offsetLeft+ step +'px';
    },30);
}