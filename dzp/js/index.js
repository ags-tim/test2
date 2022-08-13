$(function () {
    var tips = ["奖品1", "奖品2", "奖品3", "奖品4", "奖品5", "谢谢参与~"], //中奖提示
        $ring = $(".ring"),
        $prize = $(".prize"), //转盘
        $btn = $("#btn"), //按钮
        $change = $("#change"), //显示剩余抽奖机会
        $li = $(".scroll li"), //中奖信息滚动的盒子
        $sNum = $(".start-num"), //手机头号，三位数
        $eNum = $(".end-num"), //手机尾号，四位数
        $info = $(".info"), //中奖提示信息
        data = {
            count: 3
        }, //次数
        bool = false, //判断是否在旋转，true表示是，false表示否
        timer; //定时器
        $maskRule = $("#mask-rule"), //规则遮罩层
        $mask = $("#mask"), //红包遮罩层
        $winning = $(".winning"), //红包
        $card = $("#card"),
        $close = $("#close");
    //link = false;//判断是否在链接跳转中

    init();

    function init() {
        timer = setInterval(function () {
            $ring.toggleClass("light");
        }, 1000);
    }

    //点击抽奖
    $btn.click(function () {
        if (bool) return; // 如果在执行就退出
        bool = true; // 标志为 在执行
        if (data.count <= 0) { //当抽奖次数为0时
            $change.html(0); //次数显示为0
            bool = false;
            alert("没有次数了");
        } else { //还有次数就执行
            data.count--;
            data.count <= 0 && (data.count = 0);
            $change.html(data.count); //显示剩余次数
            $prize.removeClass("running");
            clickFn();
        }
    });

    //随机概率
    function clickFn() {
        var ranNum = new Array;
        for (var i = 0; i < 101; i++) {
            ranNum[i] = i + 1;
        }
        ranNum = ranNum[Math.floor(Math.random() * ranNum.length)]
        console.log(ranNum);

        if (ranNum <= 20) {
            rotateFn(1, 0, tips[0]);
        } else if (ranNum > 20 && ranNum < 40) {
            rotateFn(2, -60, tips[1]);
        } else if (ranNum >= 40 && ranNum < 60) {
            rotateFn(3, -120, tips[2]);
        } else if (ranNum >= 60 && ranNum < 80) {
            rotateFn(4, -180, tips[3]);
        } else if (ranNum >= 80 && ranNum < 90) {
            rotateFn(5, -240, tips[4]);
        } else if (ranNum >= 90 && ranNum < 100) {
            rotateFn(6, 60, tips[5]);
        }

        //var data = [1, 2, 3, 4, 5, 6]; //抽奖概率

        //data为随机出来的结果，根据概率后的结果
        //data = data[Math.floor(Math.random() * data.length)]; //1-6的随机数
        //console.log(data);

        // switch (data) { //中奖概率，可控。根据得到的随机数控制奖品
        //     case 1:
        //         rotateFn(1, 0, tips[0]);
        //         break;
        //     case 2:
        //         rotateFn(2, -60, tips[1]);
        //         break;
        //     case 3:
        //         rotateFn(3, -120, tips[2]);
        //         break;
        //     case 4:
        //         rotateFn(4, -180, tips[3]);
        //         break;
        //     case 5:
        //         rotateFn(5, -240, tips[4]);
        //         break;
        //     case 6:
        //         rotateFn(6, 60, tips[5]);
        //         break;
        // }
    }

    //选中函数。参数：奖品序号、角度、提示文字
    function rotateFn(awards, angle, text) {
        /*手机号的处理
        var arr = [13477735912, 13100656035, 15926909285];
        var a = arr[0] + "";
        var f = a.substr(0, 3);
        var l = a.substr(7, 4);*/
        bool = true;
        $prize.stopRotate();
        $prize.rotate({
            angle: 0, //旋转的角度数
            duration: 4000, //旋转时间
            animateTo: angle + 1440, //给定的角度,让它根据得出来的结果加上1440度旋转。也就是至少转4圈
            callback: function () {
                bool = false; // 标志为 执行完毕
                win(text);
                //show(1, 1, text);
            }
        });
    }

    //中奖信息滚动。前两个参数为手机号前三位和后四位手机尾号，text为中的什么奖品
    // function show(sNum, eNum, text) {
    //     //最新中奖信息
    //     $sNum.eq(2).html(sNum);
    //     $eNum.eq(2).html(eNum);
    //     $info.eq(2).html(text);
    //     $li.css("top", "-" + 40 / 75 + "rem"); //滚动
    //     //滚动之后的处理
    //     setTimeout(function () {
    //         $li.css({
    //             "top": "0",
    //             "transition": "all 0s ease-in-out"
    //         });
    //         //更新中奖信息
    //         $sNum.eq(0).html($sNum.eq(1).html());
    //         $eNum.eq(0).html($eNum.eq(1).html());
    //         $info.eq(0).html($info.eq(1).html());
    //         $info.eq(1).html($info.eq(2).html());
    //         $sNum.eq(1).html($sNum.eq(2).html());
    //         $eNum.eq(1).html($eNum.eq(2).html());
    //     }, 500);
    //     $li.css("transition", "all 0.5s ease-in-out");
    // }

    //中奖信息提示
    $("#close,.win,.btn").click(function () {
        $prize.addClass("running");
        //init();
    });


    //规则
    $(".rule").click(function () {
        $maskRule.show();
    });
    $("#close-rule").click(function () {
        $maskRule.hide();
    });

    /*中奖信息提示*/
    function win(text) {
        $(".showZJinfo").html(text);
        //遮罩层显示
        $mask.show();
        $winning.addClass("reback");
        setTimeout(function () {
            $card.addClass("pull");
        }, 500);

        //关闭弹出层
        $("#close,.win,.btn").click(function () {
            //$close.click(function () {
            $mask.hide();
            $winning.removeClass("reback");
            $card.removeClass("pull");
        });
        /*$(".win,.btn").click(function () {
            link = true;
        });*/
    }

    //此处可以在commonjs中合并
    // function queryString(name) {
    //     name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    //     var regexS = "[\\?&]" + name + "=([^&#]*)";
    //     var regex = new RegExp(regexS);
    //     var results = regex.exec(window.location.search);
    //     if (results === null) {
    //         return "";
    //     } else {
    //         return decodeURIComponent(results[1].replace(/\+/g, " "));
    //     }
    // }


});