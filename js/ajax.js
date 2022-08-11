/*搜索建议*/
let tit=document.querySelector('.tit');
let suggestlist=document.querySelector('#suggest-list');
function suggest() {
    $('#bbh').on('keyup',function() {
        var keywords=$(this).val().trim();
        if(keywords.length<=0) {
            //如果关键词为空则清空搜索建议列表
            return $('#suggest-list').toggle();
        }
        $('#suggest-list').show();
        //获取搜索建议title
        tit.innerHTML='搜"'+keywords+'"相关用户>';
        getSuggestList(keywords);
    })
    function getSuggestList(kw) {
        let xhr=new XMLHttpRequest();
        xhr.open('GET','https://netease-cloud-music-api-snowy-ten-89.vercel.app/search/suggest?keywords='+kw);
        xhr.send();
        xhr.onreadystatechange=function() {
            if(xhr.readyState===4) {
                if(xhr.status===200 || xhr.status===304) {
                    console.log(JSON.parse(xhr.response));
                    let a=JSON.parse(xhr.response).result.songs;
                    let b=JSON.parse(xhr.response).result.artists;
                    let c=JSON.parse(xhr.response).result.albums;
                    let d=JSON.parse(xhr.response).result.playlists;
                    var rows1 = [],rows2=[],rows3=[],rows4=[],index=0;
                    /* for(let i in a) {
                        rows1.push('<li class="hide">'+'<a href="javascript:;">'+a[i].name+'</a>'+'</li>');
                    }
                    for(let i in b) {
                        rows2.push('<li class="hide">'+'<a href="javascript:;">'+b[i].name+'</a>'+'</li>');
                    }
                    for(let i in c) {
                        rows3.push('<li class="hide">'+'<a href="javascript:;">'+c[i].name+'</a>'+'</li>');
                    }
                    for(let i in d) {
                        rows4.push('<li class="hide">'+'<a href="javascript:;">'+d[i].name+'</a>'+'</li>');
                    } */
                    $.each(a, function (i, item) { // 循环拼接字符串
                        rows1.push('<li class="hide">'+'<a href="javascript:;" data-index=i>'+a[i].name+'</a>'+'</li>');
                        // a.setAttribute('data-index',i);
                        // $("a[data-index='i']")
                        
                    })
                    $.each(b, function (i, item) { // 循环拼接字符串
                        rows2.push('<li class="hide">'+'<a href="javascript:;">'+b[i].name+'</a>'+'</li>')
                    })
                    $.each(c, function (i, item) { // 循环拼接字符串
                        rows3.push('<li class="hide">'+'<a href="javascript:;">'+c[i].name+'</a>'+'</li>')
                    })
                    $.each(d, function (i, item) { // 循环拼接字符串
                        rows4.push('<li class="hide">'+'<a href="javascript:;">'+d[i].name+'</a>'+'</li>')
                    })
                    $('.r1').empty().append(rows1.join('')) // 渲染列表的UI结构
                    $('.r2').empty().append(rows2.join(''))
                    $('.r3').empty().append(rows3.join(''))
                    $('.r4').empty().append(rows4.join(''))
                    tit.addEventListener('click',function() {
                        tit.setAttribute('href',`https://music.163.com/#/search/m/?s=${kw}&type=1002`)
                    })
                }
            }
        }
    }
}
suggest();

/*热门推荐*/
let RecommendImg=document.querySelectorAll('.commend-main img');
let RecommendText=document.querySelectorAll('.commend-main .retext');
let Recommendmsk=document.querySelectorAll('.commend-main .msk');
//jQuery
$(function() {
    $.ajax({
        type:'GET',
        url:'https://netease-cloud-music-api-snowy-ten-89.vercel.app/top/playlist',
        success:function(res) {
            // console.log(res.playlists);
            for(let i=0;i<8;++i) {
                RecommendImg[i].src=res.playlists[i].coverImgUrl;
                RecommendText[i].innerHTML=res.playlists[i].name;
                RecommendText[i].setAttribute('title',res.playlists[i].name);
                Recommendmsk[i].setAttribute('title',res.playlists[i].name);
            }
        }
    })
})
//原生的
/* (function() {
    let xhr=new XMLHttpRequest();
    xhr.open('GET','https://netease-cloud-music-api-snowy-ten-89.vercel.app/top/playlist');
    xhr.send();
    xhr.onreadystatechange=function() {
        if(xhr.readyState===4) {
            if(xhr.status===200 || xhr.status===304) {
                // console.log(JSON.parse(xhr.response).playlists);
                let a=JSON.parse(xhr.response).playlists;
                for(let i=0;i<8;++i) {
                    RecommendImg[i].src=a[i].coverImgUrl;
                    RecommendText[i].innerHTML=a[i].name;
                }
            }
        }
    }
})(); */
//axios
/* function Recommend() {
    axios({
        method:'GET',
        url:'https://netease-cloud-music-api-snowy-ten-89.vercel.app/top/playlist',
        params:{
            limit:50
        }
    }).then(res=>{
        // console.log(res.data.playlists);
        for (let i = 0; i < 8; i++) {
            RecommendImg[i].src = res.data.playlists[i].coverImgUrl;
            RecommendText[i].innerHTML = res.data.playlists[i].name
        }
    })
}
Recommend(); */
/*新碟上架*/
let newCover=document.querySelectorAll('.co');
let newImg = document.querySelectorAll('.cover img');
let newTitle = document.querySelectorAll('.title');
let newSinger = document.querySelectorAll('.singer');
//jQuery
$(function() {
    $.ajax({
        type:'GET',
        url:'https://netease-cloud-music-api-snowy-ten-89.vercel.app/album/newest',
        success:function(res) {
            // console.log(res);
            for (let i = 0; i < 10; i++) {
                // 图片
                newImg[i].src = res.albums[i].picUrl;
                // 文字信息
                newTitle[i].innerHTML = res.albums[i].name;
                newTitle[i].setAttribute('title',res.albums[i].name);
                newCover[i].setAttribute('title',res.albums[i].name);
                // 歌手名
                newSinger[i].innerHTML = res.albums[i].artists[0].name;
            }
        }
    })
})
//原生的
/* (function() {
    let xhr=new XMLHttpRequest();
    xhr.open('GET','https://netease-cloud-music-api-snowy-ten-89.vercel.app/album/newest');
    xhr.send();
    xhr.onreadystatechange=function() {
        if(xhr.readyState===4) {
            if(xhr.status===200 || xhr.status===304) {
                console.log();
                let a=JSON.parse(xhr.response);
                for (let i = 0; i < 10; ++i) {
                    // 图片
                    newImg[i].src = a.albums[i].picUrl;
                    // 文字信息
                    newTitle[i].innerHTML = a.albums[i].name;
                    newTitle[i].setAttribute('title',a.albums[i].name);
                    newCover[i].setAttribute('title',a.albums[i].name);
                    // 歌手名
                    newSinger[i].innerHTML = a.albums[i].artists[0].name;
                }
            }
        }
    }
})(); */
//axios
/* function New() {
    axios({
        method: 'GET',
        url: 'https://netease-cloud-music-api-snowy-ten-89.vercel.app/album/newest',
        params: {
            limit:50
        }

    }).then(res => {
        for (let i = 0; i < 10; i++) {
            // 图片
            newImg[i].src = res.data.albums[i].picUrl;
            // 文字信息
            newTitle[i].innerHTML = res.data.albums[i].name;
            newTitle[i].setAttribute('title',res.data.albums[i].name);
            newCover[i].setAttribute('title',res.data.albums[i].name);
            // 歌手名
            newSinger[i].innerHTML = res.data.albums[i].artists[0].name;
        }
    })
}
New() */

/* 榜单 */
let bs=document.querySelectorAll('.bs');   
let xg=document.querySelectorAll('.xg');
let yc=document.querySelectorAll('.yc');
(function() {
    let bsimg=document.querySelector('.bsimg');
    let xgimg=document.querySelector('.xgimg');
    let ycimg=document.querySelector('.ycimg');
    let xhr=new XMLHttpRequest();
    xhr.open('GET','https://netease-cloud-music-api-snowy-ten-89.vercel.app/toplist/detail');
    xhr.send();
    xhr.onreadystatechange=function() {
        if(xhr.readyState===4) {
            if(xhr.status===200 || xhr.status===304) {
                let a=JSON.parse(xhr.response).list;
                // console.log(a);
                bsimg.src=a[0].coverImgUrl;
                xgimg.src=a[1].coverImgUrl;
                ycimg.src=a[2].coverImgUrl;
                for(let i=0;i<3;++i) {
                   /*  //飙升榜
                    bs[i].innerHTML=a[0].tracks[i].first;
                    //新歌榜
                    xg[i].innerHTML=a[1].tracks[i].first;
                    //原创榜
                    yc[i].innerHTML=a[2].tracks[i].first; */
                    $.ajax({
                        type:'GET',
                        url:'https://netease-cloud-music-api-snowy-ten-89.vercel.app/playlist/track/all',
                        data:{
                            id:a[i].id,
                            limit:10,
                            offset:0
                        },
                        dataType:'json', //为了上面那个id传入变量
                        success:function(res) {
                            // console.log(res);
                            for(let j=0;j<10;++j) {
                                if(i===0) {
                                    bs[j].innerHTML=res.songs[j].name;
                                    bs[j].setAttribute('title',res.songs[j].name)
                                }
                                else if(i===1) {
                                    xg[j].innerHTML=res.songs[j].name;
                                    xg[j].setAttribute('title',res.songs[j].name)
                                }
                                else if(i===2) {
                                    yc[j].innerHTML=res.songs[j].name;
                                    yc[j].setAttribute('title',res.songs[j].name)
                                }
                            }

                        }
                    })
                }
            }
        }
    }
})()