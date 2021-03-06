
var images = document.getElementById("images");
var text = document.getElementById("text");
var buttonBox = document.getElementById('buttonBox');
var input = document.getElementById('input');
var score_label = document.getElementById('score');

score = 20;
last_status = 0;
status = 0;
reach_love = false;

var changeText = function (words) {
    text.innerHTML = words;
};

var changeImage = function (img) {
    images.style.backgroundImage = "url(" + img + ")";
};

var changeButtons = function (buttonList) {
    buttonBox.innerHTML = "";
    for (var i = 0; i < buttonList.length; i++) {
        dict = buttonList[i]
        name = Object.keys(dict)[0]
        s = dict[name]
        if (name == "Restart") {
            buttonBox.innerHTML += "<button onClick=\"{ restart();nextQuestion(0);}\" type=\"button\" class=\"btn btn-default btn-lg  btn-danger btn-block\">" + name + "</button>";
        } else {
            buttonBox.innerHTML += "<button onClick=\"nextQuestion(" + s + ")\" type=\"button\" class=\"btn btn-default btn-lg btn-block\">" + name + "</button>";
        }
    }
};

var changeScore = function () {
    score_label.innerHTML = score;
}

var main = document.getElementById("main");
main.addEventListener("animationend", function () {
    main.classList.remove("transfrom");
})

function restart() {
    score = 20;
    questions = JSON.parse(JSON.stringify(_questions));
    console.log("restart");
}

function popTooltip(content){
    $("#text").attr('data-original-title', content);
    $("#text").attr('data-placement', "top");
    $("#text").tooltip('show');
    setTimeout(function () {
        $("#text").tooltip('hide');
    }, 3000);
}


var nextQuestion = function (s) {
    main.classList.add("transfrom");
    score += s;

    console.log("score: ", score)
    $(".scoreModal").text(score);
    changeScore();


    if (score < 40) {
        status = 0;
        $("h2").removeClass();
        $("h2").addClass("bg-primary");
        if (last_status != status) {
            popTooltip("普通同学");
        }
    }
    else if (score < 60) {
        status = 1;
        $("h2").removeClass();
        $("h2").addClass("bg-success");
        if (last_status != status) {
            popTooltip("很好的朋友");            
        }
    }
    else if (score < 100) {
        status = 2;
        $("h2").removeClass();
        $("h2").addClass("bg-warning");
        if (last_status != status) {
            popTooltip("友达以上");            
        }
    }
    else {
        status = 3;
        $("h2").removeClass();
        $("h2").addClass("bg-danger");
        if (last_status != status) {
            popTooltip("进入热恋");            
        }
    }

    last_status = status;


    if (score < 0) {
        // changeText("You lose");

        // changeButtons([{ "Restart": 0 }])
        // restart();
        // return;
        $("#failedModal").modal();
        changeText("");
        changeButtons([{ 'Restart': 0 }]);
        return;
    }
    else if (score > 60) {
        // 进入热恋
        if (!reach_love) {
            questions = Object.assign({}, questions, _questions2);
            reach_love = true;
        }
    }

    if (Object.keys(questions).length == 0) {

        if (score < 60) {
            $("#gameStatus").text("友达以上，恋人未满");
            $("#gameStatus").removeClass();
            $("#gameStatus").addClass("bg-primary");
        }
        else if (score >= 100) {
            $("#gameStatus").text("修成正果");
            $("#gameStatus").removeClass();
            $("#gameStatus").addClass("bg-danger");

        }
        else {
            $("#gameStatus").text("进入热恋状态");
            $("#gameStatus").removeClass();
            $("#gameStatus").addClass("bg-warning");

        }

        $("#resultModal").modal();
        changeText("");
        changeButtons([{ 'Restart': 0 }]);

    }
    else {
        var keys = Object.keys(questions);
        var key = keys[Math.floor(keys.length * Math.random())];
        changeText(key);
        changeButtons(questions[key]);
        delete questions[key];
        console.log("Question left: ", Object.keys(questions).length);
    }

};


const _questions = {
    '由于男生和女生经常凑在一起说话，有同学发现了他们之间的异样，于是各种猜测，班上逐渐有各种流言传出，女生受不了同学们异样的眼光和各种流言，要求男生少来找自己':
        [{ '男生觉得无所谓，他们知道就知道了，依然我行我素，每天一下课就来找女生': -10 },
        { '男生一开始觉得无所谓，还是我行我素，一下课就来找女生，女生提出自己不喜欢这样，男生听了女生的话，有所收敛，两个人之间得到了有效的沟通': 5 },
        { '男生也觉得这些流言不好，可是他也害怕被老师和家长知道，也觉得有压力，不知道该怎么办': -20 },
        { '男生主动找传播流言的同学谈话，成功地解决了这件事，同学们之间不再每天谈论传播这件事了': 20 },
        { '男生虽然主动去找传播谈论这件事的同学谈话，可是最终也没有解决，反而更加增加了这件事的真实度，同学们还是在谈论这件事，状况并没有得到改善': -10 },
        { '男生非常没有担当，知道了同学之间的议论，直接和女生提出分手': -100 }],
    '男生有一群非常好的哥们，经常约男生下午打球':
        [{ '女生觉得男生总是和他的哥们在一起，一点都不关心在乎自己，和男生抱怨，男生觉得女生无理取闹，多次解释未果': -15 },
        { '女生觉得男生总是和他的哥们在一起，一点都不关心在乎自己，和男生抱怨，男生虽然有点不太理解女生的想法，但还是觉得女朋友重要，就很少和兄弟去打球了': 15 },
        { '女生觉得男生总是和他的哥们在一起，一点都不关心自己，和男生抱怨，男生也理解女生，有时也会拒绝打球的邀约，抽出时间陪女生，在兄弟和女朋友之间做了比较好的平衡': 15 },
        { '女生支持男生的兴趣爱好，成功的打入了内部，和男生的兄弟也玩得很好，得到了男生兄弟的支持与掩护': 25 },
        { '女生一开始也理解男生，还想认识男生的兄弟，可是男生的兄弟不喜欢她，双方之间经常有矛盾，男生夹在中间很为难': -20 }],
    '班上还有另外一个女生 B 她也很喜欢男生，这个女生 B 和男生同一个小组，她经常找男生问问题，男生的女朋友发现了这个女生 B 可能也喜欢男生':
        [{ '女生对女生 B 经常可以借学习为借口接近男生感到很苦恼和生气，于是她要求男生不准再搭理女生 B，不可以再帮女生 B 学习，她也告诉了男生那个女生的意图，男生表示不能理解女生的无理请求，他觉得一切明明很正常': -50 },
        { '女生对女生 B 经常可以借学习为借口接近男生感到很苦恼和生气，于是她要求男生不准再搭理女生 B，不可以再帮女生 B 学习，她也告诉了男生那个女生的意图，男生虽然没这么觉得但是他很在意女生的感受，于是他不再搭理女生 B': 30 },
        { '女生和女生 B 交涉未果后决定主动出击，她不动声色地利用各种理由开始主动找男生，同时暗地里和女生 B 展开了较量，两人都想赢得男生的关注，男生并没有发现什么异常反而为女生的主动感到开心': 15 },
        { '女生和女生 B 交涉未果后决定主动出击，她不动声色地利用各种理由开始主动找男生，同时暗地里和女生 B 展开了较量，两人都想赢得男生的关注，长此以往女生觉得很累受不了这样': -30 },
        { '女生和女生 B 交涉未果后决定主动出击，她不动声色地利用各种理由开始主动找男生，同时暗地里和女生 B 展开了较量，两人都想赢得男生的关注，男生也发现了女生 B 的意图，他直接告诉女生 B 自己不喜欢她，让她少来找自己': 35 }],
    '男生和女生都很不喜欢化学老师，课上经常听不进去，男生选择':
        [{ '在课上与女生（同桌）聊天': 10 },
        { '在课上一起与女生写数学作业': 5 },
        { '与女生讨论自己喜好的异性类型，评点女明星身材以及同班女生相貌': -5 }],
    '女生因为化学课上经常听不进去，选择':
        [{ '与男生谈论自己最近在追的某男星，要求男生为该男星投票': -5 },
        { '与男生吐槽化学老师': 10 },
        { '讨论数学题': 5 },
        { '一起刷胡志辉老师微博（假装还没被封┐(ﾟ～ﾟ)┌ ），畅想未来的大学生活': 10 }],
    '男生因上课不听课成绩下降被化学老师约谈':
        [{ '承诺自己努力学好化学，之后在课上不再继续与女生一起写数学作业': -10 },
        { '鼓励女生努力学好化学，尽管女生不听却不厌其烦': -5 },
        { '敷衍老师，之后回去继续我行我素': 5 }],
    '化学老师告到班主任那里，班主任给男生三个选择':
        [{ '座位换到一名化学成绩好的女生旁边': -10 },
        { '放学后找化学老师单独辅导，不能与女生放学一起走': -10 },
        { '敷衍老师，各种搪塞，只说自己会努力学习化学，但不同意前两种方案': 5 }],
    // '化学成绩提高，但与女生日渐疏远。一日，两人恰好都坐在办公室外讨论区的沙发上，在等待语文老师过来单独谈作文。此时只有二人，男生选择':
    //     [{ '默默无语，等待语文老师': -5 },
    //     { '向女生倾诉衷肠': 10 },
    //     { '偷偷把手伸过去，企图拉女生的手': 15 }],
    '即将中考了，学业繁忙，好不容易等到中午的午休时间，他（她）邀请你一起出去散散步':
        [{ '虽然你很可爱，但是疲惫的我只想睡觉': -10 },
        { '犹豫了一下，还是一起出去了，但是表现得兴致缺缺': -5 },
        { '毫不犹豫地答应，并且在路上找一些轻松的话题，聊聊天': 10 }],
    '他（她）的座位离我好远啊，但是我真的好想知道她（他）在做什么。不停地转头望向他（她）的座位，哎呀，眼神对视了！':
        [{ '冷漠地转回头，假装听课听累了扭扭脖子': 0 },
        { '羞涩地对视，有种蓦然回首，旁人皆不在的感觉': 10 },
        { '大胆地盯着看，直到对方率先顶不住，溜了溜了': 5 },
        { '不行不行，我不能看他（她），忍住，我们能赢': 0 }],
    '他（她）参加校运会了，表现有点普通，似乎很沮丧。这时，广播里开始播报大家写给运动员的加油稿。':
        [{ '写下匿名加油稿，默默地为他（她）加油。': -5 },
        { '直接跑到广播台，亲自朗读自己写的加油稿。': 5 },
        { '买一瓶水，跑过去送过他（她），再递上干净的毛巾，为他（她）加油。': 10 }],
    '“周末一起出去玩吧，我都听你的安排～”':
        [{ '选择困难，算了还是各自宅在家里语音聊天吧。': -5 },
        { '玩王者荣耀吗？我们峡谷见！': -10 },
        { '认真制定计划，一起轧马路看电影。': 5 }]
}
const _questions2 = {
    '班主任单独找女生谈话':
        [{ '表示没有的事情，自己与男生毫无关系': -10 },
        { '胆战心惊，不知所措，做一条标准的鱼肉，静待班主任宰割': -5 },
        { '表示是“我们俩的事”，宁死不屈': 10 }],
    '班主任单独找男生谈话，把女生的反应告知男生':
        [{ '表示全是自己一厢情愿，女生与此毫无关系，一切都冲着自己来': 10 },
        { '保证从此一刀两断，好好学习': -15 },
        { '坦诚双方各有往来，但保证没有耽误学习': 0 }],
    '我对象成绩一直都比我好，马上就要中考了，他（她）说 “加油，我们要考上一所高中！”':
        [{ '“我当然想和你一起去，但是我做不到啊。”': -10 },
        { '“我一定会努力！你可要监督我哦。”': 10 },
        { '“相信我，就算我们不在一所学校，也会好好的。”': -5 }],
    '明天要去约会了，我该怎么打扮呢': [{ '非常随性': -5 }, { '干净整洁': 5 }, { '精致猪精': 10 }],
    '在路上牵手散步，碰到了老师／同学，糟糕，要被发现了！':
        [{ '牵起他（她）的手狂奔，找一个安全的小角落': 5 },
        { '大大方方地从老师／同学旁边走过，顺便打个招呼': -10 },
        { '我是隐形人，我是隐形人': 0 }],
    '被父母发现，手机被没收': [{ '偷出手机，与女生聊天': 30 }, { '乖乖听话，没有手机联络': -20 }],
    '对方过生日，需要零花钱买礼物': [{ '问父母要，买礼物': 20 }, { '买别的礼物，不是对方最想要的': 10 }, { '不买': -20 }]
}

var questions = JSON.parse(JSON.stringify(_questions));

nextQuestion(0);

$(".button-restart").click(function () {
    restart();
    nextQuestion(0);
});


$(function () {
    $('[data-toggle="popover"]').popover()
})
