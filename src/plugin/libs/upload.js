// TODO: axios使用了拦截器，如果使用axios上传图片会出现报错的问题；解决方法
// 1、使用xhr代替axios（当前使用）
// 2、修改拦截器设置使拦截器拦截上传图片的请求
import axios from 'axios'
export default (dir, file) => {
  return axios.post('base/common/getPolicy', {dir}).then(data => {
    data.OSSAccessKeyId = data.accessid
    delete data.accessid
    const formData = new FormData()
    for (const key in data) {
      if (key !== 'host') {
        formData.append(key, data[key])
      }
    }
    formData.append('name', file.name)
    formData.append('key', data.dir + '/' + file.name)
    formData.append('file', file)
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onerror = function error (e) {
        console.log(e)
        reject(e)
      }
      xhr.onload = function onload () {
        if (xhr.status < 200 || xhr.status >= 300) {
          reject(xhr.status)
        }
        console.log(`${data.host}/${dir}/${file.name}`)
        resolve(`${data.host}/${dir}/${file.name}`)
      }
      xhr.open('post', data.host, true)
      // xhr.withCredentials = true
      xhr.send(formData)
    })
  })
}
