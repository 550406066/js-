var pullDown=function(){
    this.html='<div class="main">\
        <input type="text"  id="makeEnter" class="makeEnter" placeholder="请选择或输入"/>\
        <ul  id="optionList" class="optionList">\
        </ul>\
        <div  id="icon" class="icon iconfont icon-xiala pull-down-icon"></div>\
    </div>'
    this.TempArr = [];
    this.ajaxUrl={
        demoUrl:"https://easy-mock.com/mock/5b0d5a9d2179ff1c604e3bf3/scroll_copy_copy/"
    }
}
pullDown.prototype={
    getData:function(){
        var _this=this
        $.ajax({
            type: "GET",
            url:_this.ajaxUrl.demoUrl,
            data:{},
            dataType:"json",
            success:function(data){
                if(data.code==0){
                    var dataLenth=data.data
                    if(dataLenth.length!=0){
                        
                        for(var i=0;i<dataLenth.length;i++){
                            $("#optionList").append("   <li>"+dataLenth[i].county+"</li>")
                        }
                        _this.bind();                  
                    }else{

                    }
                }
                console.log(data)
            }
        })
    },
    setfocus : function () {
        $("#optionList").css({ "display": "block" });
    
    },

     setinput:function() {
        var select = $("#optionList");
        var TempArr=this.TempArr;
        var makeEnterVal=$("#makeEnter").val()
        select.html("");
        console.time('setinput'); // 启动计时, 该时刻命名为 setinput (可以自定)
        // ...  要执行的代码块
     
     
        for (i = 0; i < TempArr.length; i++) {
        
            //若找到以txt的内容开头的，添option  
            if (TempArr[i].substring(0, makeEnterVal.length).indexOf(makeEnterVal) == 0) {

            
                len =makeEnterVal.length
                var selectVal = TempArr[i].substr(0, len)

                var option = $("<li></li>").html("<span class='selectVal'>" + selectVal + "</span>" + TempArr[i].substring(len, TempArr[i].length));
                // var option = $("<li></li>").html("<em>"+TempArr[i]+"</em>");  
                // var option = $("<li></li>").text(TempArr[i]);  
                select.append(option);
                console.timeEnd('setinput'); // 定时结束, 浏览器控制台将输出代码块的执行时间
            }
        }
        if( $("#optionList").html()===""){
            select.append("<span class='no-data'>未找到数据···</span>")
        }
    },
    bind:function(){
        var _this=this
 
        $("#optionList li").each(function (index, el) {
            _this.TempArr[index] = $(this).text();
        });
        $("body").off("click","#makeEnter").on("click","#makeEnter",function(){
  
            _this.setfocus()
        })
        $("body").off("click","#icon").on("click","#icon",function(){
            if(  $("#optionList").css("display")=="block"){
                $("#optionList").css({ "display": "none" })
            }else{
                $("#optionList").css({ "display": "block" });
            }
           
        })
        $("body").off("click","#optionList li").on("click","#optionList li",function(){
     
            $(this).parent().prev("#makeEnter").val($(this).text());
            $("#optionList").css({ "display": "none" });
        });
        $("body").off("input","#makeEnter").on("input","#makeEnter",function(){
    
            _this.setinput()
        })
  
    },
    init:function(){
        this.getData();
      $("body").append(this.html)
    }
}
var pullDown=new pullDown()
pullDown.init()