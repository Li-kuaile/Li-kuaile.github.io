
**轮播图效果，无动画直接切换，手动+定时自动**

# js实现

> 替换轮播图片资源，修改文件位置后可直接运行。为了方便三个文件都在一个目录下。

### 1. 首先搭建html结构
{% raw %}
```xml
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="test.css">
    <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
</head>
<body>
    <div class="carousel-container">
        <div class="fa fa-chevron-left fa-2x prev" aria-hidden="true"></div>
        <div class="fa fa-chevron-right fa-2x next" aria-hidden="true"></div>

        <div class="carousel-wrapper">
            <ul class="carousel">
                <li><img src="/react-profile/assets/projects/carousel/1.jpg" alt=""></li>
                <li><img src="/react-profile/assets/projects/carousel/2.jpg" alt=""></li>
                <li><img src="/react-profile/assets/projects/carousel/3.jpg" alt=""></li>
                <li><img src="/react-profile/assets/projects/carousel/4.jpg" alt=""></li>
                <li><img src="/react-profile/assets/projects/carousel/5.jpg" alt=""></li>
            </ul>
        </div>
        
        <ul class="dots">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
    <script src="test.js"></script>
</body>
</html>
```
{% endraw %}
### 2. 然后是样式
{% raw %}
```css
* {
    margin: 0;
    padding: 0;
}

.carousel-container {
    width: 500px;
    height: 300px;
    position: relative;
    /* border: 1px solid #ccc; */

}

.carousel-wrapper {
    overflow: hidden;
}

.carousel {
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
}

img {
    width: 500px;
    height: 300px;
}

.next,
.prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    /* background: rgba(248, 77, 77, 0.5); */
    width: 30px;
    height: 30px;
    z-index: 2;
    color: red;
}

.prev {
    left: 0;
}

.next {
    right: 0;
}

.dots {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
}

.dots li {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: red;
    margin: 0 7px;
    cursor: pointer;
}

.dots li:first-child {
    background: #fff;
}
{% endraw %}
```
### 3. 最后是js文件
{% raw %}
```javascript
let dot = document.querySelector('.dots');
let dot_li = dot.querySelectorAll('li');

let img = document.querySelectorAll('img');
let carousel = document.querySelector('.carousel');

let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let chosed = 0;

function changeImg() {
    carousel.style.transform = 'translateX(-' + chosed + '00%)';
    dot_li.forEach((item, index) => {
        if (index == chosed) {
            item.style.backgroundColor = '#fff';
        } else {
            item.style.backgroundColor = 'red';
        }
    })
}
function autoChange() {
    return setInterval(() => {
        chosed = (chosed + 1) % dot_li.length;
        changeImg();
    }, 2000);
}

let timer = autoChange();

for (let i = 0; i < dot_li.length; i++) {
    dot_li[i].addEventListener('click', function () {
        chosed = i;
        changeImg();
        clearInterval(timer);
        timer = autoChange();
    })
}
prev.addEventListener('click', function () {
    chosed = (chosed - 1 + dot_li.length) % dot_li.length;
    changeImg();
    clearInterval(timer);
    timer = autoChange();
}
)
next.addEventListener('click', function () {
    chosed = (chosed + 1) % dot_li.length;
    changeImg();
    clearInterval(timer);
    timer = autoChange();

}
)
```
{% endraw %}
# react18实现
### 1. 样式文件
这个和js实现的方法差不多
{% raw %}
```css
*{
    padding: 0;
    margin: 0;
}

.carousel{
    position: relative;
    width: 200px;
    height: 150px;
    overflow: hidden;

    
}
.carouselItems{
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
}
.dotsItems{
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 10px;
    left: 100px;
    transform: translateX(-50%);
    
}

.carouselDots{
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: red;
    margin: 0 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}
.carouselDots:hover{
    background-color: #fff;
}
.active{
    background-color: #fff;
}
.right,
.left{
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 1;
    background: rgb(255, 0, 0,0.5);
}
.right{
    right: 0;
}
.left{
    left: 0;
}
```
{% endraw %}
### 2. jsx代码段
react很方便的利用useEffect,useState两个hook实现当前选中的图片索引的跟踪
{% raw %}
```javascript
import React, { useEffect,useState } from 'react'
import { getImageurl } from "../../../../utils"

import styles from './Viewproject.module.css'

let carouselimg=[
    '1.jpg',
    '2.jpg',
    '3.jpg',    
    '4.jpg',
    '5.jpg'
]

export default function Viewproject() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timer, setTimer] = useState(null)

  const handleClick=(index)=>{
    clearTimeout(timer)
    setActiveIndex(index)
  }
  useEffect(() => {
    setTimer(setTimeout(()=> {
        setActiveIndex((activeIndex+1)%carouselimg.length)     
    }, 1500))
  }, [activeIndex])
  
  return (
    <div>
            <div className={styles.carousel}>
                <div className={styles.carouselItems} style={{transform: `translateX(${-activeIndex*100}%)`}}>
                {
                    carouselimg.map((img,index) => (
                        <div className={styles.carouselItem}>
                            <img key={index} src={getImageurl(`projects/carousel/${img}`)} style={{width: '200px',height:'150px'}}/>
                        </div>
                    ))
                    
                }
                </div>
                <div className={styles.dotsItems}>
                {
                    carouselimg.map((img,index) => (
                        <div className={styles.carouselDots}
                        style={activeIndex===index?{backgroundColor:'#fff'}:{backgroundColor:'red'}}
                        onClick={()=>handleClick(index)} key={index}>
                        </div>
                    ))
                }
                </div>
                <div className={styles.left} onClick={()=>handleClick((1-activeIndex+carouselimg.length)%carouselimg.length)}></div>
                <div className={styles.right} onClick={()=>handleClick((activeIndex+1)%carouselimg.length)}></div>
        </div>
    </div>
  )
}

```
{% endraw %}
