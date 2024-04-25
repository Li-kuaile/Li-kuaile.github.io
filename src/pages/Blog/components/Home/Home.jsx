import React from 'react'
import { Carousel, Descriptions } from 'antd'

const contentStyle = {
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
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
export default function Home() {
    return (
        <>
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
            <Descriptions title="My Info" items={items} style={{ marginTop: 30 }}/>
        </>

    )
}
