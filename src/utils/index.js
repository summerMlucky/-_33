export function resolveToBase64(file) {
  return new Promise((resolve) => {
    const fr = new FileReader()
    fr.readAsDataURL(file) // 异步的，等到onload执行完毕才会被读取
    fr.onload = (e) => {
      resolve(e.target.result)
    }
  })
}
