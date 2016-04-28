/**
 * Created by Dev02 on 2016/4/22.
 * paginationConf = {
        currentPage: 1,     //当前页，默认第一页开始
        itemsPerPage: 15,   //页面大小，一页显示多少
        pagesLength: 15,    //设置页码显示多少格
        perPageOptions: [10, 20, 30, 40, 50],
        rememberPerPage: 'perPageItems',
        isAbortOnceChange:true,   //是否一开始就执行onchange,默认false
        onChange: function(){
            console.log(this);
        }
    };
 */
(function ($) {
    var g_conf={
        currentPage:1,
        itemsPerPage:10,
        pagesLength:10,
        perPageOptions: [10, 20, 30, 40, 50],
        totalItems:0,
        numberOfPages:0,
        pageList:[]
    };
    var pagerVue;
    Vue.directive('pager', {
        deep: true,
        template:'<div><div id="pagerCtrl" class="row" v-show="conf.totalItems > 0">'+
            '<div class="col-sm-6">'+
            //'<div class="dataTables_info" role="status" aria-live="polite">当前第 1 - 10 条  共计 10 条</div>'+
            '<div class="dataTables_length"><label>每页<select  id="perpageselct" name="editable_length" v-model="conf.itemsPerPage" aria-controls="editable" class="form-control input-sm"><option v-for="option in conf.perPageOptions" value="{{option}}">{{option}}</option></select> 条数据&nbsp;共计 {{conf.totalItems}} 条</label></div>'+
            '</div>' +
            '<div class="col-sm-6"><div class="dataTables_paginate paging_simple_numbers">'+
            '<ul class="pagination">' +
            '<li class="paginate_button previous" v-bind:class="{disabled:conf.currentPage == 1}" v-on:click="prevPage()" aria-controls="editable" tabindex="0"><a href="javascript:">前一页</a></li>' +
            '<li class="paginate_button" v-for="item in conf.pageList" v-bind:class="{active:item == conf.currentPage, separate:item == \'...\'}" v-on:click="changeCurrentPage(item)" aria-controls="editable" tabindex="0"><a href="javascript:">{{item}}</a></li>' +
            '<li class="paginate_button next" v-bind:class="{disabled:conf.currentPage == conf.numberOfPages}" v-on:click="nextPage()" aria-controls="editable" tabindex="0"><a href="javascript:">后一页</a></li>' +
            '</ul></div></div>' +
            '</div></div>',
        bind: function () {
            // 准备工作
            // 例如，添加事件处理器或只需要运行一次的高耗任务
            tmpl=$(this.template);
            this.el.outerHTML=tmpl.html();
            pagerVue=new Vue({
                el: '#pagerCtrl',
                data: {
                    conf:g_conf
                },
                methods:
                {
                    onpagechange:function()
                    {
                        if(g_conf.onchange!=undefined)
                        {
                            g_conf.onchange(this.conf);
                        }
                    },
                    changeCurrentPage:function(item)
                    {
                        if(this.conf.currentPage!=item)
                        {
                            console.log(item);
                            this.conf.currentPage=item;
                            this.onpagechange();
                        }
                    },
                    prevPage:function()
                    {
                        if(this.conf.currentPage>1)
                        {
                            this.conf.currentPage--;
                            this.onpagechange();
                        }
                    },
                    nextPage:function()
                    {
                        if(this.conf.currentPage<g_conf.numberOfPages)
                        {
                            this.conf.currentPage++;
                            this.onpagechange();
                        }
                    },
                    changeItemsPerPage:function()
                    {
                        console.log(this.conf.itemsPerPage);
                        this.onpagechange();
                    }
                }
            });
            if(perpageselct)
            {
                perpageselct.addEventListener('change', function()
                {
                    pagerVue.changeItemsPerPage();
                });
            }
        },
        update: function (_conf) {
            // 值更新时的工作
            // 也会以初始值为参数调用一次
            g_conf=$.extend(g_conf, _conf);
            var str=JSON.stringify(g_conf);
            if(temp==str)
            {
                return;
            }
            temp=str;
            g_conf.numberOfPages=Math.ceil(g_conf.totalItems/g_conf.itemsPerPage);
            g_conf.pageList=[];
            for(var i=0;i<g_conf.numberOfPages;i++)
            {
                g_conf.pageList.push(i+1);
            };
            pagerVue.conf=g_conf;
        },
        unbind: function () {
            // 清理工作
            // 例如，删除 bind() 添加的事件监听器
        }
    });

    var temp;
})($);