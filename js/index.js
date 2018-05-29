var pullDown=function(){
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
   
        for (i = 0; i < TempArr.length; i++) {
        
            //若找到以txt的内容开头的，添option  
            if (TempArr[i].substring(0, makeEnterVal.length).indexOf(makeEnterVal) == 0) {

            
                len =makeEnterVal.length
                var selectVal = TempArr[i].substr(0, len)

                var option = $("<li></li>").html("<span class='selectVal'>" + selectVal + "</span>" + TempArr[i].substring(len, TempArr[i].length));
                // var option = $("<li></li>").html("<em>"+TempArr[i]+"</em>");  
                // var option = $("<li></li>").text(TempArr[i]);  
                select.append(option);
            }
        }
    },
    bind:function(){
        var _this=this
        $("#optionList li").each(function (index, el) {
            _this.TempArr[index] = $(this).text();
        });
        $("#makeEnter").bind("focus",function(){
            _this.setfocus()
        })
        $("#icon").bind('click', function (e) {
            $("#optionList").css({ "display": "block" });
        })
        $("#optionList li").bind('click',function () {
     
            $(this).parent().prev("#makeEnter").val($(this).text());
            $("#optionList").css({ "display": "none" });
        });
        $("#makeEnter").bind("input",function(){
            _this.setinput()
        })
  
    },
    init:function(){
        this.getData();
      
    }
}
var pullDown=new pullDown()
pullDown.init()