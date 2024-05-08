# 组件介绍
用了两种方式实现，注释详细~
可能代码写的不够简洁，见谅🙁
![在这里插入图片描述](https://raw.githubusercontent.com/Li-kuaile/Li-kuaile.github.io/main/assets/page/page1.png)

**1. 包含内容显示的分页器**
网上看了很多实现，很多只有分页器部分，没和内容显示联动。
因此我增加了模拟content的显示，这里模拟了32条数据，通过分页器控制每页的显示。

**2. 切换每页显示数目**
列举了三种，5，10，20条每页
![在这里插入图片描述](/assets/page/page2.png)

**3. 输入值后通过enter跳转**
做了一个范围保护，如果超出当前范围，会自动变成最大或最小的页码。（做提示也可以，但我不想点提示的确认）
![在这里插入图片描述](/assets/page/page3.png)


# 原生JS实现
## 1. HTML

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
    <div class="content">
    </div>
    <div class="page">
        <button class="prev disabled">&lt;&lt;</button>
        <button class="prev disabled">&lt;</button>

        <ul class="page-list">
        </ul>

        <button class="next">&gt;</button>
        <button class="next">&gt;&gt;</button>

        <select class="page-size">
            <option value="5">每页显示5条</option>
            <option value="10">每页显示10条</option>
            <option value="20">每页显示20条</option>
        </select>

        <span>跳转到</span>
        <input class="jump-to" type="number" value="1">
        <span>页</span>
    </div>
    <script src="script.js"></script>
</body>

</html>
```
## 2.CSS

```css
* {
    font-size: 16px;
    margin: 0;
    padding: 0;
}

a {
    display: inline-block;
    text-decoration: none;
    color: #000;
    padding: 10px 15px;
}

.content {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px;
}

.content div {
    width: 220px;
    height: 50px;
    background-color: #78b5e7;
    margin: 10px;
}

.page {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 100px;
    background-color: #f5f5f5;
}

.page-list {
    list-style: none;
    display: flex;
    flex-direction: row;
}

.prev,
.next,
.page-num {
    border-radius: 4px;
    padding: 0;
    border: 0;
    cursor: pointer;
}

.prev,
.next {
    padding: 10px 15px;
}

.prev:hover,
.next:hover,
.page-num:hover {
    background-color: #e9e7e7;
}

.active {
    background-color: #bee5fc;
}

select {
    font-size: 16px;
    padding: 5px 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.jump-to {
    font-size: 16px;
    padding: 5px 5px;
    border-radius: 4px;
    width: 35px;
    border: 1px solid #ccc;
}

button:active {
    background-color: #fff;
}

.disabled {
    color: #b3b3b3;
    cursor: not-allowed;
    opacity: 0.6;
}
```

## 3. JS

```javascript
let content = document.querySelector('.content');
let contentNum = 32;
for (let i = 0; i < contentNum; i++) {
    let div = document.createElement('div');
    div.innerHTML = i + 1;
    content.appendChild(div);
}

let current = 1; //当前页码，默认是第一页

let pagelist = document.querySelector('.page-list');

let showpage = document.querySelector('.page-size');
let pagenum = showpage.value; //默认一页显示多少内容
let num = Math.ceil(contentNum / parseInt(pagenum)); //默认显示的页数的页数

let prev = document.querySelectorAll('.prev');
let next = document.querySelectorAll('.next');


// 展示当前页码的内容
function showContent() {
    let start = (current - 1) * parseInt(pagenum);
    let end = start + parseInt(pagenum);
    for (let i = 0; i < content.children.length; i++) {
        if (i >= start && i < end) {
            content.children[i].style.display = 'block';
        } else {
            content.children[i].style.display = 'none';
        }
    }
}
// 展示页码列表
function showPage() {
    // 清空原有的超出所需页面数量的页码列表 
    while (pagelist.children.length > num) {
        pagelist.removeChild(pagelist.children[num]);
    }
    // 补充所需页面数量的页码列表
    for (let i = pagelist.children.length; i < num; i++) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = '#' + i;
        a.innerHTML = i + 1;
        li.appendChild(a);
        li.classList.add('page-num');
        // 高亮默认页码
        if (i === 0) {
            li.classList.add('active');
        }
        pagelist.appendChild(li);
    }
    // 找到要点击的目标元素
    let targetElement = pagelist.querySelector('li:nth-child(1) a');
    // 使用click()方法触发点击事件
    targetElement.click();
    //显示当前页码的内容
    showContent();
}
// 按钮状态
function buttonStatus() {
    // 两个按钮都要取消禁用
    prev.forEach(function (item) {
        item.classList.remove('disabled');
    });
    next.forEach(function (item) {
        item.classList.remove('disabled');
    });
    // 如果当前页码是第一页，那么上一页和首页按钮都要禁用
    if (current == 1) {
        prev[0].classList.add('disabled');
        prev[1].classList.add('disabled');
    }
    // 如果当前页码是最后一页，那么下一页和末页按钮都要禁用
    else if (current == num) {
        next[0].classList.add('disabled');
        next[1].classList.add('disabled');
    }
}
//默认显示最开始的内容
showPage();

////////////////////////////////////////////////////////// 绑定事件

//select改变
showpage.addEventListener('change', function () {
    // 重新计算页数
    pagenum = showpage.value;
    num = Math.ceil(contentNum / parseInt(pagenum));
    // 超出范围的页码要置为最后一页，否则会报错
    if (current > num) {
        current = num;
    }
    // 显示当前页码的内容
    showPage();
});
//点击页码列表
pagelist.addEventListener('click', function (event) {
    // 点击的是页码列表
    if (event.target.tagName === 'A') {
        // 取消当前页码的active
        pagelist.children[current - 1].classList.remove('active');
        // 点击的页码会变成active
        event.target.parentNode.classList.add('active');
        // 更新当前页码
        current = event.target.innerHTML;
        // 显示当前页码的内容
        buttonStatus();
        showContent();
    }
}
);
//绑定按钮事件
//如果当前大于1，那么两个prev都不禁用
//如果当前在最后一页，此时下一页禁用，那么点击后要取消下一页的禁用
for (let i = 0; i < prev.length; i++) {
    prev[i].addEventListener('click', function () {
        if (current > 1) {
            //取消当前页码的active
            pagelist.children[current - 1].classList.remove('active');
            //如果当前页码是最后一页，那么下一页要取消禁用
            next.forEach(function (item) {
                item.classList.remove('disabled');
            });
            if (i == 0)
                //如果是第一个prev，回到第一页
                current = 1;
            else
                //回到上一页
                current--;
            //添加active到当前页码
            pagelist.children[current - 1].classList.add('active');
            //如果当前页码是第一页，那么上一页要取消禁用
            if (current === 1) {
                prev.forEach(function (item) {
                    item.classList.add('disabled');
                });
            }
        }
        showContent();
    }
    )
}
//点击下一页
for (let i = 0; i < next.length; i++) {
    next[i].addEventListener('click', function () {
        if (current < num) {
            //取消当前页码的active
            pagelist.children[current - 1].classList.remove('active');
            //如果当前页码是第一页，那么上一页要取消禁用
            prev.forEach(function (item) {
                item.classList.remove('disabled');
            });
            //回到最后一页
            if (i == 1)
                current = num;
            else
                current++;
            //添加active到当前页码
            pagelist.children[current - 1].classList.add('active');
            //如果当前页码是最后一页，那么下一页要取消禁用
            if (current === num) {
                next.forEach(function (item) {
                    item.classList.add('disabled');
                })
            }
        }
        showContent();
    }
    )
}

//跳转到指定页码
let jump = document.querySelector('.jump-to');
jump.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        // 溢出保护
        if (event.target.value > pagelist.children.length) {
            event.target.value = pagelist.children.length;
        }
        if (event.target.value < 1) {
            event.target.value = 1;
        }
        // 模拟点击事件
        let targetElement = pagelist.querySelector('li:nth-child(' + event.target.value + ') a');
        // 使用click()方法触发点击事件
        targetElement.click();
        buttonStatus();
        showContent();
    }
});


```


# React实现
还是react方便。。。。😟
![在这里插入图片描述](/assets/page/page4.png)

## 1.jsx
```javascript
import React, { useEffect, useState } from 'react'
import styles from './App.module.css'

export default function App() {
    //创建大小为32的数组，内容为索引+1
    const content = Array.from({ length: 32 }, (_, i) => i + 1);

    const [currentPage, setCurrentPage] = useState([]);//当前页内容
    const [current, setCurrent] = useState(1);//当前页码
    const [pagenum, setPagenum] = useState(5);//每页显示条数
    const num = Math.ceil(content.length / pagenum);//总页数

    const [previousDisabled, setPreviousDisabled] = useState(true);//上一页按钮是否禁用
    const [nextDisabled, setNextDisabled] = useState(false);//下一页按钮是否禁用

    const [inputValue, setInputValue] = useState('');//跳转页码输入框值

    function showContent() {//显示当前页内容
        let start = (current - 1) * pagenum;
        let end = start + pagenum;
        setCurrentPage(content.slice(start, end));
    }
    function buttonStatus() {//按钮状态
        if (current == 1) {//第一页
            setPreviousDisabled(true);
            setNextDisabled(false);
        }
        if (current == num) {//最后一页
            setNextDisabled(true);
            setPreviousDisabled(false);
        }
        if (current != 1 && current != num) {//中间页
            setPreviousDisabled(false);
            setNextDisabled(false);
        }
    }

    useEffect(() => {//页面初始化
        showContent();
        buttonStatus();
    }, [current, pagenum]);

    return (
        <div style={{ padding: '20px' }}>
            <div className={styles.content}>
                {
                    // 创建模拟数据内容
                    currentPage.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))
                }
            </div>
            <div className={styles.page}>
                {/*  向前按钮 */}
                <button className={`${styles.prev} ${previousDisabled ? styles.disabled : ''}`}
                    onClick={() => { setCurrent(1) }}
                >&lt;&lt;</button>
                <button className={`${styles.prev} ${previousDisabled ? styles.disabled : ''}`}
                    onClick={() => { current > 1 ? setCurrent(current - 1) : null }}
                >&lt;</button>
                {/*  页码 */}
                <ul className={styles.pageList}>
                    {
                        Array.from({ length: num }, (_, i) => i + 1).map(item => (
                            <li key={item}
                                className={current === item ? styles.active : ''}
                                onClick={() => {
                                    setCurrent(item);
                                }}>
                                <a href={`#${item}`}>{item}</a>
                            </li>
                        ))
                    }
                </ul>
                {/* 向后按钮 */}
                <button className={`${styles.next} ${nextDisabled ? styles.disabled : ''}`}
                    onClick={() => { current < num ? setCurrent(current + 1) : null }}
                >&gt;</button>
                <button className={`${styles.next} ${nextDisabled ? styles.disabled : ''}`}
                    onClick={() => { setCurrent(num) }}
                >&gt;&gt;</button>
                {/* 页面数量选择框 */}
                <select className={styles.pageSize} onChange={(e) => {
                    setPagenum(parseInt(e.target.value));
                    setCurrent(1);
                    setInputValue(1);
                }}>
                    <option value="5">每页显示5条</option>
                    <option value="10">每页显示10条</option>
                    <option value="20">每页显示20条</option>
                </select>
                {/* 跳转页面输入框 */}
                <span>跳转到</span>
                <input className={styles.jumpTo} type="number" defaultValue={inputValue} value={inputValue}
                    //记录输入框值
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                    //跳转到指定页码,回车键触发,限制输入范围
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {//回车键触发
                            let value = parseInt(e.target.value);
                            if (value > num) value = num;//限制输入范围
                            if (value < 1) value = 1;
                            setCurrent(value);//指定页码
                            setInputValue(value);//更新输入框（因为限制输入范围）
                        }
                    }} />
                <span>页</span>
            </div>
        </div>
    )
}

```
## 2. CSS

```css
* {
    font-size: 16px;
    margin: 0;
    padding: 0;
}

a {
    display: inline-block;
    text-decoration: none;
    color: #000;
    padding: 10px 15px;
}

.content {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px;
}

.content div {
    width: 220px;
    height: 50px;
    background-color: #78b5e7;
    margin: 10px;
}

.page {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 100px;
    background-color: #f5f5f5;
}

.page-list {
    list-style: none;
    display: flex;
    flex-direction: row;
}

.prev,
.next,
.page-num {
    border-radius: 4px;
    padding: 0;
    border: 0;
    cursor: pointer;
}

.prev,
.next {
    padding: 10px 15px;
}

.prev:hover,
.next:hover,
.page-num:hover {
    background-color: #e9e7e7;
}

.active {
    background-color: #bee5fc;
}

select {
    font-size: 16px;
    padding: 5px 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.jump-to {
    font-size: 16px;
    padding: 5px 5px;
    border-radius: 4px;
    width: 35px;
    border: 1px solid #ccc;
}

button:active {
    background-color: #fff;
}

.disabled {
    color: #b3b3b3;
    cursor: not-allowed;
    opacity: 0.6;
}
```


##### 小记
写原生js的时候还是比较慢，后续要加强
