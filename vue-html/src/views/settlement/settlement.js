
import common from '~/common'
import './css/settlement.scss'
var $ = common.$;
var Vue= common.Vue;
import like from '@/likeCom'
$(function(){
  console.log('settlement');
})
new Vue({
  el:'#app',
  data:{
    show:false,
    layer:null,
    username:'彭湃'
  },
  components:{
    'like':like
  },
  methods:{
    on_change(i_said){
      console.log(i_said);
    }
  },
  created(){
    console.log('sdfsdf');
  },
  mounted(){
    var that = this;
    console.log('13213');
    layui.use(['layer', 'form'], function(){
      var layer = that.layer = layui.layer
      layer.msg('Hello World');
    });
  },
})