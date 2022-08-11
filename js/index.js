window.addEventListener('load',function() {
    //搜索框效果制作
    let input=document.getElementById('bbh');
    input.onfocus=function() {
        if(this.value=='音乐/视频/电台/用户') {
            this.value='';
        }
        this.style.color='#000';
    }
    input.onblur=function() {
        if(this.value=='') {
            this.value='音乐/视频/电台/用户';
            this.style.color='#9B9B9B';
        }
    }
    //回到顶部按钮制作
    let another=document.querySelector('.another');
    document.addEventListener('scroll',function() {
        if(window.pageYOffset==0) {
            another.style.display='none';
        }
        else {
            another.style.display='block';
        }
    })
    //轮播图效果制作
    let focus=this.document.querySelector('.focus');
    let main=this.document.querySelector('.main');
    let arrow_l=this.document.querySelector('.arrow-l');
    let arrow_r=this.document.querySelector('.arrow-r');
    let ul=focus.querySelector('ul');
    let ol=this.document.querySelector('.circle');
    let img=this.document.querySelectorAll('.focus ul li');
    let banner = document.querySelectorAll('.focus img')
    let circle=0,timer=null;
    let xhr=new XMLHttpRequest();
    xhr.open('GET','https://netease-cloud-music-api-snowy-ten-89.vercel.app/banner');
    xhr.send();
    xhr.onreadystatechange=function() {
        if(xhr.readyState===4) {
            if(xhr.status===200 || xhr.status===304) {
                var a=JSON.parse(xhr.response).banners;
                // console.log(a);
                for (let i = 0; i < banner.length; i++) {
                    banner[i].src = a[i].imageUrl;
                }
                main.style.backgroundImage = `url(${a[0].imageUrl+'?imageView&blur=40x20'})`;
                main.addEventListener('mouseenter',function() {
                    clearInterval(timer);
                    timer=null;
                })
                main.addEventListener('mouseleave',function() {
                    timer=setInterval(function() {
                        arrow_r.click();
                    },5000);
                })
                //生成小圆圈
                for(let i=0;i<ul.children.length;++i) {
                    let li=document.createElement('li');
                    li.setAttribute('index',i);
                    ol.appendChild(li);
                    li.addEventListener('click',function() {
                        for(let i=0;i<ol.children.length;++i) {
                            ol.children[i].id='';
                        }
                        this.id='current';
                        document.querySelector('.active').classList.remove('active');
                        img[i].classList.add('active');
                        main.style.backgroundImage = `url(${a[li.getAttribute('index')].imageUrl+'?imageView&blur=40x20'})`;
                    })
                }
                //默认第一个小圆圈为红色
                ol.children[0].id='current';
                //点击右侧按钮
                let index=0;
                arrow_r.addEventListener('click',function() {
                    index++;
                    index=index%8;
                    bg();
                    circle++;
                    if(circle==ol.children.length) {
                        circle=0;
                    }
                    circleChange();
                })
                //点击左侧按钮
                arrow_l.addEventListener('click',function() {
                    index--;
                    if(index<0) {
                        index=7
                    }
                    bg();
                    circle--;
                    circle=circle<0?ol.children.length-1:circle;
                    circleChange();
                })
                //图片制作函数
                function bg() {
                    document.querySelector('.focus ul .active').classList.remove('active')
                    img[index].classList.add('active')
                    main.style.backgroundImage =`url(${a[index].imageUrl+'?imageView&blur=40x20'})`;
                }
                //小圆圈改变
                function circleChange() {
                    for(let i=0;i<ol.children.length;++i) {
                        ol.children[i].id='';
                    }
                    ol.children[circle].id='current';
                }
                //自动播放
                timer=setInterval(function() {
                    arrow_r.click();
                },5000);
            }
        }
    }
    //新碟上架
    let b1=document.querySelector('.b1');
    let b2=document.querySelector('.b2');
    let newul=document.querySelector('.new-main ul');
    let focusWidth=690;
    let newtimer=null,flag=true;
    //点击右侧按钮
    num=0;
    b2.addEventListener('click',function() {
        if(flag) {
            flag=false;
            console.log(num);
            if(num==1) {
                newul.style.left=0;
                num=0;
                flag=true;
            }
           else {
                animate(newul,-focusWidth*(++num),function() {flag=true;});
           }
            
        }
    })
    //点击左侧按钮
    b1.addEventListener('click',function() {
        if(flag) {
            flag=false;
            if(num==0) {
                num=1;
                newul.style.left=-num*focusWidth+'px';
                flag=true;
            }
            else {
                animate(newul,-focusWidth*(--num),function() {flag=true;});
            }
        }
    })

})