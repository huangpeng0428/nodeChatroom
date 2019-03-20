<template>
  <div class="hello">
        <div class="login-wrap" v-if="!isCheckin">
          <div class="login-con">
            <h3 style="color:#fff">用户登录</h3>
            <input type="text" placeholder="请输入昵称" id="loginName" v-model.trim="uname" @keyup.13="login">
            <button class="login-btn" @click="login">登录</button>
          </div>
        </div>
        
        <div class="chat-wrap " v-else>
          <h1>多人聊天室（总人数：{{amount}}）</h1>
          <div class="chat-con clearfix" id="chat_con">
            <div v-for="(item,i) in msgList" :key="i">
              <!-- {{item | json}} -->
              <div v-if="item.msgType==0">
                 <p >{{item.message}}</p><br/>
              </div>
             
              <div v-else>
                  <div class="chat-item item-right clearfix" v-if="uname == item.username "><span class="img fr"></span><span class="message fr">{{item.message}}</span></div>
                  <div class="chat-item item-left clearfix rela" v-else><span class="abs uname">{{item.username}}  ( {{item.msgDate | formatDate}} )</span><span class="img fl"></span><span class="fl message">{{item.message}}</span></div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <input type="text" id="sendtxt" v-model.trim="inputMsg" @keyup.13="sendMessage">
            <button class="sendBtn" @click="sendMessage">发送</button>
          </div>
        </div>
  </div>
</template>

<script>

// const Socket = require('socket.io')
// import Socket from 'socket.io'
export default {
  name: 'chatRoom',
  data () {
    return {
      msg: 'this is a chatRoom',
      amount: 0,          //聊天室总数人
      uname: 'polo',    //定义用户名
      inputMsg: '',
      socket: null,       //定义socket实例
      isCheckin: false,
      msgList:[],         //服务端返回的信息列表
    }
  },
  mounted () {
    /*建立socket连接，使用websocket协议，端口号是服务器端监听端口号*/
    // alert(String(io('ws://10.8.0.85:8088'))) 
    this.$nextTick(()=> {
      alert(io)
      this.socket = io('ws://10.8.0.85:8088');
      /*登录成功*/
      this.socket.on('loginSuccess',(data) => {
        if(data.username === this.uname){
          // vm.checkin(data)
          this.isCheckin = true;
        }else{
          alert('用户名不匹配，请重试')
        }
      })
  
      /*登录失败*/
      this.socket.on('loginFail',()=>{
        alert('昵称重复')
      })
  
      /*监听人数*/
      this.socket.on('amountChange',(data)=>{
        this.amount = data
      })
  
      
  
      /*接收消息*/
      this.socket.on('receiveMessage',(data)=>{
        console.log('接收到服务端返回：',data)
        this.msgList.push(data);
        window.scrollTo(0, document.getElementById('chat_con').scrollHeight);     //接收消息滚动条永远在底部
        
      })
    })
  },
  filters:{
    formatDate (data) {
      var date = data ? new Date(data) : new Date();
      var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
      return time;
    }
  },
  methods:{
    /*登录*/
    login () {
      console.log(this.socket)
      alert(this.socket)
      if(this.uname){
        /*向服务端发送登录事件*/
        this.socket.emit('login',{username:this.uname})
      }else{
        alert('请输入昵称')
      }
    },
   
    /*发送消息*/
    sendMessage (){
      if(this.inputMsg){
        this.socket.emit('sendMessage',{username:this.uname,message:this.inputMsg});
        this.inputMsg = '';
      }else{
        alert('请输入……')
      }
    },
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('../assets/css/chat');
.hello {
  height: 100%;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
