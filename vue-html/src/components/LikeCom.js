export default {
  data(){
    return {
      i_said: '1214'
    }
  },
  props: ['username'],
  template: `
      <div>
          <h2>局部组件定义方法一</h2>
          <h3></h3> 
          <p>{{username}}</p>
          <input type="text" @keyup="on_change" v-model="i_said"/>
          
      </div>
  `,
  methods: {
    on_change(){
      this.$emit('on_change', this.i_said);
    }
  },
}