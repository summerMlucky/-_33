<template>
  <div>
    <!-- 个人信息导航条 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 信息修改cell单元格 -->
    <input
      type="file"
      ref="file"
      hidden
      accept=".png,.pdf,.jpg"
      @change="selsectPhoto"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="avator" />
    </van-cell>
    <!-- 更新弹出层 -->
    <van-popup
      v-model="isShowPhoto"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 头像 -->
      <update-avator
        v-if="isShowPhoto"
        :photo="photo"
        :avator.sync="avator"
      ></update-avator>
    </van-popup>
    <!-- 昵称 -->
    <van-cell
      title="昵称"
      :value="userProfile.name"
      is-link
      @click="isShowNickname = true"
    ></van-cell>
    <van-popup
      v-model="isShowNickname"
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-nickname
        v-if="isShowNickname"
        :name="userProfile.name"
        @change-nickname="userProfile.name = $event"
      ></update-nickname>
    </van-popup>
    <!-- 性别 -->
    <van-cell
      title="性别"
      :value="userProfile.gender === 0 ? '男' : '女'"
      is-link
      @click="isShowGender = true"
    ></van-cell>
    <van-popup
      v-model="isShowGender"
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <update-gender
        v-if="isShowGender"
        :gender="userProfile.gender"
        @change-gender="userProfile.gender = $event[0]"
      ></update-gender>
    </van-popup>
    <!-- 生日 -->
    <van-cell
      title="生日"
      is-link
      @click="isShowBirthday = true"
      :value="userProfile.birthday"
    ></van-cell>
    <van-popup
      v-model="isShowBirthday"
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <update-birthday
        v-if="isShowBirthday"
        :birthday="userProfile.birthday"
        @change-birthday="userProfile.birthday = $event"
      ></update-birthday>
    </van-popup>
  </div>
</template>

<script>
// 1.点击修改头像
// -手动的触发input:file的点击事件

// 2.获取用户选择的图片
// -给input:file绑定change
// -选择的图片有两种保存方式
// (1) input:file.value属性上，保存的是文件的绝对路径
// (2)files数组里，保存的File对象(File对象:文件的二进制对象)

// 怎么把File对象转成base64
// -FileReader:文件阅读器
// -const fr = new FileReader(); fr.readAsDataURL(file);
// -接收读取的结果：fs.onload = (e)={ e.target.result/* base64 */}

// input:file
// -hidden:等于display:none
// -accept:规定file选择文件的类型
import UpdateAvator from './components/UpdateAvator.vue'
import UpdateNickname from './components/UpdateNickname.vue'
import UpdateGender from './components/UpdateGender.vue'
import UpdateBirthday from './components/UpdateBirthday.vue'
import { resolveToBase64 } from '@/utils/index'
import { getUserProfileAPI } from '@/api'
export default {
  data() {
    return {
      isShowPhoto: false,
      isShowNickname: false,
      isShowGender: false,
      isShowBirthday: false,
      photo: '',
      avator: '',
      userProfile: {}
    }
  },
  components: {
    UpdateAvator,
    UpdateNickname,
    UpdateGender,
    UpdateBirthday
  },
  created() {
    this.getUserProfile()
  },
  methods: {
    async selsectPhoto() {
      // 获取到用户选择的图片的file对象
      const file = this.$refs.file.files[0]
      // file对象转成img.src可识别的属性---->file对象转成base64
      const base64 = await resolveToBase64(file)
      this.photo = base64
      this.isShowPhoto = true
      // 解决change不能连续选中同一张图片的bug
      // 图片传出后把图片的value置空
      this.$refs.file.value = ''
    },
    async getUserProfile() {
      const { data } = await getUserProfileAPI()
      this.userProfile = data.data
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-nav-bar__arrow) {
    color: #fff;
  }
}
</style>
