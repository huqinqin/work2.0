## data
```
selections: [], // 选项
list: [], // 表格数据
rows: 10, // 单页条数
total: 40, // 总数
page: 1 // page
```

## methods
> query

根据url，调用fetch方法，使用查询参数：rows，page，filter，获取数据，将data.list赋给list，data.total赋给total

> changeSelection

修改选中的值

> changePage

设置页数，再调用query方法

> changeSize

设置rows，再调用query方法

> deleteItem

调用提示框组件
1. 点击取消删除显示消息提示
2. 点击确认，根据url，调用del方法，，参数：ids(id数组)，删除成功显示成功消息提示

> removeSelections

删除选择值，调用提示框组件，提示要删除的值
1. 点击取消删除显示消息提示
2. 点击确认，根据url，调用del方法，，参数：ids(id数组，使用map方法从selections中获取)，删除成功显示成功消息提示

## 使用说明

路由中的页面一般在打开时，获取数据，在beforeMount中调用query方法，获取初始数据

当在组件中使用如果使用props传值，则watch传值，传值改变则触发query方法






