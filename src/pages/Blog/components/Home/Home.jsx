import React from 'react'
import { Carousel, Descriptions } from 'antd'
import styles from './Home.module.css'

const items = [
    {
        key: '1',
        label: '姓名',
        children: 'Li Wenxuan',
    },
    {
        key: '2',
        label: 'Phone',
        children: '17720559782',
    },
    {
        key: '3',
        label: 'Email',
        children: 'liwenxuan0930@gmail.com',
    },
    {
        key: '4',
        label: '目前所在地',
        children: 'Shanghai',
    },
    {
        key: '5',
        label: 'Birthday',
        children: '2000-09-30',
    },
    {
        key: '6',
        label: '专业',
        children: '计算机',
    },  
    {
        key: '7',
        label:'学历',
        children: '研二在读',
    }
];
export default function Home(props) {
    return (
        <>
            <Carousel autoplay autoplaySpeed={1000} fade className={styles.gradientBorder}>
                <div>
                    <h3 >耐心负责😆</h3>
                </div>
                <div>
                    <h3 >专注🧐</h3>
                </div>
                <div>
                    <h3 >诚信忠诚😁</h3>
                </div>
                <div>
                    <h3 >理性严谨✊</h3>
                </div>
                <div>
                    <h3 >谦虚😇</h3>
                </div>
                <div>
                    <h3 >ISTJ🤠</h3>
                </div>
            </Carousel>
            <Descriptions title="My Info" items={items} style={{ marginTop: 30 }}/>
        </>

    )
}
