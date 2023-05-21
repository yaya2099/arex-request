# 可视化响应

Postman Visualizer提供了一种可编程的方式来直观地表示您的请求响应。添加到请求测试的可视化代码将呈现在响应主体的可视化选项卡中，以及 Pretty、Raw 和 Preview 选项。

![s](./visualizer-v8.jpg)

可视化工具让您以有助于理解的方式呈现您的响应数据。您可以使用可视化工具来建模和突出显示与您的项目相关的信息，而不必通读原始响应数据。当您共享 Postman Collection时，您团队中的其他人也可以在每个请求的上下文中了解您的可视化效果。

```js
// Set visualizer
pm.visualizer.set(template, {
    // Pass the response body parsed as JSON as `data`
    response: pm.response.json()
});
```
