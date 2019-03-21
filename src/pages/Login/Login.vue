<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: passType}" @click="passType=true">短信登录</a>
          <a href="javascript:;" :class="{on: !passType}" @click="passType=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <!--短信登录-->
          <div :class="{on: passType}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="login.phone">
              <button
                :disabled="!verificationCode || verNum>0"
                class="get_verification"
                :class="{right_phone_number: verificationCode, dis_clas: verNum}"
                @click.prevent="sendVerificationCode"
              >
                {{verNum>0 ? `已发送${verNum}s` :'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="login.code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!--验证码登录-->
          <div :class="{on: !passType}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="login.name">
              </section>
              <section class="login_verification">
                <input :type="pwdShow?'text':'password'" maxlength="8" placeholder="密码" v-model="login.pwd">
                <div
                  class="switch_button"
                  @click="pwdShow=!pwdShow"
                  :class="{on: pwdShow, off: !pwdShow}"
                >
                  <div class="switch_circle" :class="{right: pwdShow}"></div>
                  <span class="switch_text">{{pwdShow?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="login.captcha">
                <img
                  class="get_verification"
                  src="http://localhost:5000/captcha"
                  alt="captcha"
                  @click="uploadCaptcha"
                  ref="captcha"
                >
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="loginHan">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
  import {reqSendCode, reqPwdLogin, reqSmsLogin} from '../../api'
  // import {mapState} from 'vuex'

  import {Toast, MessageBox} from 'mint-ui'

  export default {
  /*
  * 1. passType控制类名，实现密码/短信登录的切换
  * 2. 登录信息的相关数据设置
  * 3. 短信登录区块验证码的显示/隐藏/倒计时
  * 4. 密码登录区块
  * */

  data () {
    return {
      passType: true, //true短信登录  false密码登录
      // 登录相关参数
      login: {
        phone: '', // 手机号
        code: '', // 短信验证码
        name: '', // 用户名
        pwd: '', // 密码
        captcha: '' // 图形验证码
      },
      // 控制验证码倒计时数
      verNum: 0,
      // 密码的显示和隐藏
      pwdShow: false
    }
  },
  computed: {
    verificationCode () { // false发送验证码不显示  true发送验证码显示
      const {phone} = this.login
      const reg = /^1\d{10}$/
      return reg.test(phone)
    },
  },
  methods: {
    // 点击发送验证码
    async sendVerificationCode () {
      const {phone} = this.login
      // 1.页面的显示
      this.verNum = 30
      const timer = setInterval(()=>{
        this.verNum--
        if (this.verNum <= 0){
          this.verNum = 0
          clearInterval(timer)
        }
      }, 1000)
      // 2.发送Ajax
      const result = await reqSendCode(phone)
      if (result.code === 0) { //成功
        Toast({
          message: '发送成功',
          duration: 1500
        })
      } else { //失败
        Toast({
          message: result.msg,
          duration: 1500
        })
        // 停止定时器
        this.verNum = 0
      }
    },
    // 登录
    async loginHan () {
      const {passType, login, verificationCode} = this
      const {phone, code, name, pwd, captcha} = login
      let result
      // 短信登录
      if (passType) {
        if (!verificationCode) {
          return alert('请输入正确的手机号')
        } else if (!/^[0-9]{6}$/.test(code)) {
          return alert('请输入6位数字验证码')
        }
        // 发送请求
        result = await reqSmsLogin(phone, code)
        // 如果成功了，停止计时
        if (result.code == 0) {
          this.verNum = 0
        }
      } else { // 密码登录
        if (!name.trim()) {
          return alert('用户名不能为空')
        } else if (!pwd.trim()) {
          return alert('密码不能为空')
        } else if (!/^[0-9a-zA-Z]{4}$/.test(captcha)) {
          return alert('请输符合要求的4位验证码')
        }
        // 发送请求
        result = await reqPwdLogin({name, pwd, captcha})
        // 如果失败了，刷新图片
        if (result.code === 1) {
          this.uploadCaptcha ()
        }
      }
      // 统一对结果进行处理
        if (result.code === 0) {
          // 成功登录
          const user = result.data
          this.$store.dispatch('saveUser', user) //触发cation中的saveUser方法
          // 跳转到/profile
          this.$router.replace('/profile')
        } else {
          // 登录失败
          MessageBox.alert(result.msg)
        }
    },
    // 点击图形验证码，更新图片
    uploadCaptcha () {
      this.$refs.captcha.src = 'http://localhost:5000/captcha?time=' + Date.now()
    }
  },
}
</script>

<style lang="stylus" scoped>
  .loginContainer
    width 100%
    height 100%
    background #fff
    padding-bottom 20px
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 48%
                right 0px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color #333
                &.dis_clas
                  color #888
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
                    text-align left
                  .switch_text
                    float left
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
