/**
 * Created by Dev02 on 2016/4/15.
 */
Vue.directive('test', {
    bind: function () {
        // 准备工作
        // 例如，添加事件处理器或只需要运行一次的高耗任务
    },
    update: function (newValue, oldValue) {
        // 值更新时的工作
        // 也会以初始值为参数调用一次
        console.log(newValue);
    },
    unbind: function () {
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
    }
})