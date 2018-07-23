## 人员列表

### mixins

引入list.js实现列表基本功能，在beforeMount中调用query查询列表数据

### methods

> toggleStatus

切换状态，绑定switch组件on-change方法，将获取的值使用接口发送给后端（明确接口名，发送值，状态名）

> resetPassword

传入params.row.id作为id  
点击重置密码按钮，弹出提示信息，
1. 点击取消，显示取消信息
2. 点击确认，通过接口发送id，成功显示成功信息

> 查看

router.push({name: '', params.row.id})

> 编辑

router.push({name: '', params.row.id})

##　人员编辑



