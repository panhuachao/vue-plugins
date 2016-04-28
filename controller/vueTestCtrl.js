/**
 * Created by panhuachao on 2016/4/16.
 */
(function()
{
    var testVue=new Vue({
        el: '#vueTestCtrl',
        data: {
            location:{
              province:"广东",
              city:"广州",
              district:"白云区"  //location控件中district项目业务暂无要求，故还没实现
            },
            membersList:[],
            pageConf:{
                currentPage: 1,     //当前页，默认第一页开始
                itemsPerPage: 5,   //页面大小，一页显示多少
                pagesLength: 15,    //设置页码显示多少格
                totalItems:0,
                perPageOptions: [5, 10, 20, 30, 50],
                onchange:function(obj)
                {
                    //分页控件回调
                    testVue.pageConf.itemsPerPage=parseInt(obj.itemsPerPage);
                    testVue.pageConf.currentPage=parseInt(obj.currentPage);
                    testVue.showMembers();
                }
            },
            showtotalcolumns:["姓名"  ,"性别" ,"手机号"],// 总可显示列
            showcolumns:["姓名" ,"性别" ,"手机号"],  //设置可显示列
            sortconf:{
                field:"",
                sorttype:'sorting_asc' //"sorting_desc"
            },
            searchkeyword:""
        },
        methods:
        {
            getLocation:function()
            {
               console.log(this.location);
               alert(this.location.province+this.location.city);
            },
            login:function()
            {
                
            },
            showMembers: function()
            {
              //重新分页处理
              var totals=[];
                //搜索关键词
                for(var i=0;i<originTotalMembers.length;i++)
                {
                    var curobj=originTotalMembers[i];
                    var isexist=false;
                    for(var p in curobj)
                    {
                        if (typeof (curobj[p]) == "string" ){
                            if(curobj[p].indexOf(testVue.searchkeyword)>-1)
                            {
                                isexist=true;
                            }
                        }
                    }
                    if(isexist)
                    {
                        totals.push(originTotalMembers[i]);
                    }
                }
                //排序
                if(this.sortconf.field)
                {
                    var sortresult=(this.sortconf.sorttype=="sorting_asc"?true:false);
                    var sortfield=this.sortconf.field;
                    totals.sort(function(a,b){
                        if(a[sortfield]==null||a[sortfield]==undefined)
                        {
                            a[sortfield]="";
                        }
                        if(b[sortfield]==null||b[sortfield]==undefined)
                        {
                            b[sortfield]="";
                        }
                        if(typeof a[sortfield] =="number")
                        {
                            a[sortfield]=a[sortfield]+"";
                        }
                        if(typeof b[sortfield] =="number")
                        {
                            b[sortfield]=b[sortfield]+"";
                        }
                        if(sortresult)
                        {
                            return a[sortfield].localeCompare(b[sortfield]);
                        }else
                        {
                            return b[sortfield].localeCompare(a[sortfield]);
                        }
                    });
                }
                totalMembers=totals;

                this.pageConf.totalItems=totalMembers.length;
                var pagecount=Math.ceil(this.pageConf.totalItems/this.pageConf.itemsPerPage);
                if(pagecount<this.pageConf.currentPage)
                {
                    this.pageConf.currentPage=1;
                }

                this.membersList.length=0;
                if(totalMembers.length>this.pageConf.itemsPerPage)
                {
                    var start=(this.pageConf.currentPage-1)*this.pageConf.itemsPerPage;
                    var length=start+this.pageConf.itemsPerPage>totalMembers.length?totalMembers.length:start+this.pageConf.itemsPerPage;
                    for(var i=start;i<length;i++)
                    {
                        this.membersList.push(totalMembers[i]);
                    }
                }else
                {
                    this.membersList=totalMembers.slice(0);  //数组copy
                }
            },
            //设置列
            setShowColumn:function(colunmn)
            {
                var index=this.showcolumns.indexOf(colunmn);
                if(index>-1)
                {
                    this.showcolumns.splice(index,1);
                }else
                {
                    this.showcolumns.push(colunmn);
                }
                setCookie("show_columns", JSON.stringify(this.showcolumns));
            },
            //判断列
            checkShowColumn:function(colunmn)
            {
                var index=this.showcolumns.indexOf(colunmn);
                if(index>-1)
                {
                    return true;
                }else
                {
                    return false;
                }
            },
            //点击排序
            sort:function(field)
            {
                //排序
                this.sortconf.field=field;
                this.sortconf.sorttype=this.sortconf.sorttype=="sorting_asc"?"sorting_desc":"sorting_asc";
                this.showMembers();
            },
            getSortType:function(filedname)
            {
                if(this.sortconf.field==filedname)
                {
                    return this.sortconf.sorttype;
                }
                return "";
            }
        },
         watch: {
            'searchkeyword': function (val, oldVal) {
                //因双向绑定，searchkeyword会自动获取输入值，但我们需要获取值之后执行搜索
                if(val!=oldVal)
                {
                    this.showMembers();
                }
            }
        }
    });
   
    //可异步获取列表数据
    var originTotalMembers=[{
                member_name:"张三",
                member_sex:"男",
                member_mobile:"13548569854"
            },{
                member_name:"李四",
                member_sex:"男",
                member_mobile:"13548569854"
            },{
                member_name:"王五",
                member_sex:"女",
                member_mobile:"13548569821"
            },{
                member_name:"张三",
                member_sex:"女",
                member_mobile:"13548569854"
            },{
                member_name:"张三",
                member_sex:"男",
                member_mobile:"13548569854"
            },{
                member_name:"张三",
                member_sex:"男",
                member_mobile:"13548569854"
            },{
                member_name:"张三",
                member_sex:"男",
                member_mobile:"13548569854"
            }];   //原始总数居
    var totalMembers=originTotalMembers;    //当前符合条件的总数居，如搜索之后结果

    testVue.pageConf.totalItems=totalMembers.length;
    testVue.showMembers();

     //读取可显示列设置cookie
    var columns=getCookie("show_columns");
    if(columns!=null)
    {
        testVue.showcolumns=JSON.parse(columns);
    }

    //写cookies
    function setCookie(name,value)
    {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
    }
    function getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

})();   
//如有需要引入jquery,或接口对象，或外面js需要引用里面变量，可以是使用var vue=(function($,userApi){})($,userApi) 这种方式,如
// var vue=(function($,userApi)
// {
//    var vue=new Vue(..);
//    return vue;
// })($,userApi);  
//在其他js文件可以直接使用vue对象