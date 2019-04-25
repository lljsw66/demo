;var adPlugin = (function () {
    function getAd(params) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        // 传参并指定回调执行函数为onBack
        let url = encodeURIComponent('http://qadx.qinlinad.com/ad/request?slot_id=' + params.slot_id + '&channelId=' + params.channelId);
        script.src = 'http://39.107.69.127:8080/login?url=' + url + '&callback=adPlugin.onBack';
        script.id = 'callBackRadom';
        document.head.appendChild(script);
        removeScript('callBackRadom')
    }

    //成功后移除动态加载的<script>标签
    function removeScript(id) {
        var head = document.getElementsByTagName('head')[0];
        var el = document.getElementById(id);
        if (head != null && el != null) {
            head.removeChild(el);
        }
    }

    // jsonp回调执行函数
    function onBack(res) {
        console.log(JSON.parse(res));
        if(JSON.parse(res).code == 200){
            let data = JSON.parse(res).result.ads;
            createElement(data)
        }else{
            alert(JSON.parse(res).code+JSON.parse(res).ms)
        }

    }

    //生成img和p标签
    function createElement(params) {
        let str = '';
        for (let i = 0; i < params.length; i++) {
            let landUrl = params[i].landUrl;
            let urlTitle = params[i].urlTitle?params[i].urlTitle:'标题';
            // console.log(urlTitle);
            str += '<div><img src=' + params[i].url + ' alt=""  onclick="adPlugin.clickFun('+"'"+landUrl+"'"+')" style="width:100%"><p id="adver-title'+i+'" data-title="'+urlTitle+'" style="text-align: center"></p></div>'

        }
        // console.log(str);
        document.getElementById('adver').innerHTML = str;
        // console.log(document.getElementById('adver'));
        for(let i = 0;i<params.length;i++){
            let p = document.getElementById('adver-title' + i);
            p.innerText = p.getAttribute('data-title')
        }
    }

    //图片点击事件
    function clickFun(url) {
        console.log('点击了');
        setTimeout(function () {
            window.open(url);
            console.log('离开了');
        }, 1000)
    }

    return {
        getAd: getAd,
        clickFun: clickFun,
        onBack: onBack

    };
})();