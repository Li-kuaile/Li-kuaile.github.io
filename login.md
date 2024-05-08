先看看效果图
![在这里插入图片描述](/assets/login/login1.png)

和一般的登陆页面不同的是，label添加了跳动效果

![在这里插入图片描述](/assets/login/login2.png)


> 参考github上demo系列
> https://github.com/bradtraversy/50projects50days?tab=readme-ov-file

## html搭建结构

```xml
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Login Page</h1>
        <form>
            <div class="form-control">
                <input type="text" required>
                <label>Username</label>
            </div>
            <div class="form-control">
                <input type="password" required>
                <label>Password</label>
            </div>
            <button class="btn">Login</button>
            <p class="text">Don't have an account? <a href="#">Register</a> </p>
        </form>
    </div>
    <script src="script.js"></script>
</body>
</html>
```
### CSS绘制样式
#### 几个重要的点
- **实现相对于父元素水平垂直居中**
这里我用的是定位+transform位移
- **input框的样式设定**
背景透明，去除边框，只保留底部
- **label的动画**
为了在输入的时候实现label的动画，我们不用placeholder，我们在input后放置label，靠定位把label放在input垂直居中，然后利用js处理，添加逐字符上移的动画。
```css
body {
    position: relative;
    height: 100vh;
}

.container {
    position: absolute;
    width: 350px;
    height: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background-color: rgb(84, 192, 255, 0.7);
}

.container h1 {
    text-align: center;
    color: white;
    font-size: 35px;
}

.container form {
    padding: 30px;
}

.form-control {
    position: relative;
    margin: 10px 0 25px;
    width: 100%;
}

.form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px #fff solid;
    display: block;
    width: 100%;
    padding: 15px 0;
    font-size: 18px;
    color: #fff;
    position: relative;
    z-index: 100;
}

.form-control input:focus,
.form-control input:valid {
    outline: 0;
    border-bottom-color: rgb(193, 223, 235);
}

.form-control label {
    position: absolute;
    top: 15px;
    left: 0;
    pointer-events: none;
    color: #4075a7;
}

.form-control label span {
    display: inline-block;
    font-size: 18px;
    min-width: 5px;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-control input:focus+label span,
.form-control input:valid+label span {
    color: rgb(193, 223, 235);
    transform: translateY(-30px);
}


.btn {
    margin-top: 10px;
    bottom: 10px;
    height: 40px;
    width: 100%;
    font-size: 18px;
    border: 0;
    border-radius: 5px;
}

.btn:active {
    transform: scale(0.98);
    outline: 1px solid #015cb1;
}

.container a {
    text-decoration: none;
    color: #015cb1;
}
```
### js实现
为了给label实现动画，实现每个字母逐个上移的效果，我们给每个label里的单词的每个字母，将其单独作为一个span，按照其索引位置添加时延，从而达成逐个上移的效果。

```javascript
const labels = document.querySelectorAll('.form-control label')
//对每个label元素进行动画效果
labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')//将label元素的文字分割成数组
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)//将数组元素用span标签包裹并添加延迟
        .join('')//将数组元素用span标签包裹并用空格连接起来
})
```

