import React, { useEffect, useState } from 'react'
import styles from './Viewproject.module.css'

export default function Viewproject() {
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
