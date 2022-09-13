import dayjs from 'dayjs'
const reactiveTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/zh-cn')
dayjs.extend(reactiveTime)
dayjs.locale('zh-cn')
export default dayjs
