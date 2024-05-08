import React, { useState } from 'react';
import {
  ContainerOutlined,
  DesktopOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RollbackOutlined,
  OpenAIOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, ConfigProvider, Switch, Tooltip, Button, FloatButton } from 'antd';

import { getImageurl } from "../../utils"
import Projects from "./components/Projects/Projects"
import Home from "./components/Home/Home"
import HTML from "./components/HTML/HTML"
// import CSS from "./components/CSS/CSS"
// import JavaScript from "./components/JavaScript/JavaScript"
import React_page from "./components/React_page/React_page"
import Viewproject from './components/Viewproject/Viewproject';

import Chat from './components/Chat/Chat';
import NotFound from "../NotFound/NotFound"
import { useNavigate, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import CustomBreadcrumb from './CustomBreadcrumb';

import projects from '../../data/projects.json'

const data = [
  {
    key: 'home',
    path: '/blog/home',
    meta: {
      title: '首页',
    },
  },
  {
    key: 'projects',
    path: '/blog/projects',
    meta: {
      title: '项目',
    },
  },
  {
    key: 'blogs',
    path: '/blog/blogs',
    meta: {
      title: '博客',
    },
    children: [
      {
        key: 'HTML',
        path: '/blog/blogs/HTML',
        meta: {
          title: 'HTML',
        }
      },
      {
        key: 'CSS',
        path: '/blog/blogs/CSS',
        meta: {
          title: 'CSS',
        }
      },
      {
        key: 'JavaScript',
        path: '/blog/blogs/JavaScript',
        meta: {
          title: 'JavaScript',
        }
      },
      {
        key: 'React',
        path: '/blog/blogs/React',
        meta: {
          title: 'React',
        }
      }
    ]
  },
  {
    key: 'chatGPT',
    path: '/blog/chatGPT',
    meta: {
      title: '聊天机器人',
    },
  }
]
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('首页', '/blog/home', <HomeOutlined />),
  getItem('项目', '/blog/projects', <DesktopOutlined />),
  getItem('博客', '/blog/blogs', <ContainerOutlined />, [
    getItem('HTML', '/blog/blogs/HTML'),
    getItem('CSS', '/blog/blogs/CSS'),
    getItem('JavaScript', '/blog/blogs/JavaScript'),
    getItem('React', '/blog/blogs/React'),
  ]),
  getItem('chatGPT', '/blog/chatGPT', <OpenAIOutlined />),
];
const menu_items = ['/blog/home', '/blog/projects', '/blog/blogs', '/blog/blogs/HTML', '/blog/blogs/CSS', '/blog/blogs/JavaScript', '/blog/blogs/React', '/blog/chatGPT']


const Blog = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const navigate = useNavigate()
  const onClick = (e) => {
    navigate(e.key, { replace: true })
  }
  // 主题颜色
  const theme_ = 'light';
  const [isdark, setIsdark] = useState(false);
  const onChange = (checked) => {
    // console.log(`switch to ${checked}`);
    setIsdark(checked);
  };
  let { pathname } = useLocation();

  return (
    <ConfigProvider theme={{ algorithm: isdark ? theme.darkAlgorithm : theme.lightAlgorithm }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="60"
          // onBreakpoint={(broken) => {
          //   console.log(broken);
          // }}
          // onCollapse={(collapsed, type) => {
          //   console.log(collapsed, type);
          // }}
          width='330px'
          theme={theme_}
          collapsed={collapsed}
          trigger={null}
          collapsible
          style={{ position: 'relative' }}
        >
          <div className="demo-logo-vertical" style={{ margin: '50px 50px 15px' }} >
            <Link to='/'>
              <img src={getImageurl("hero/avatar.png")} alt="avatar" style={{ height: '220px', display: collapsed ? 'none' : 'block' }} />
            </Link>
          </div>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['/blog/blogs']}
            mode="inline"
            theme={theme_}
            items={items}
            style={{ fontSize: '23px' }}
            onClick={onClick}
            selectedKeys={menu_items.find(item => pathname.includes(item))}
          />
          <div style={{ height: '50px' }}></div>
          <Button type="link" href='/resume' style={{ position: 'absolute', bottom: '0', display: 'block', fontSize: '16px', fontWeight: 'bold' }}>
            {collapsed ?
              <Tooltip placement="topLeft" title="跳转到个人简历页">
                <RollbackOutlined />
              </Tooltip>
              : '跳转到个人简历页'}
          </Button>

        </Sider>
        <Layout >
          <Header
            style={{
              padding: '0 20px 0 0',
              background: isdark ? '' : colorBgContainer,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '18px',
                width: 64,
                height: 64,
              }}
            />
            <div style={{ fontSize: '16px' }}>
              <span>切换主题</span>
              <Tooltip placement="bottomRight" title='切换主题'>
                <Switch defaultChecked={false} onChange={onChange} style={{ marginLeft: '10px' }} />
              </Tooltip>
            </div>

          </Header>
          <Content
            style={{
              margin: '24px 16px 0',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CustomBreadcrumb data={data} />
            <div
              style={{
                padding: '24px',
                flex: 1,
                background: isdark ? '' : colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/" element={<Navigate to="/blog/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blogs" element={<Navigate to="/blog/blogs/HTML" />} />
                <Route path="/blogs/HTML" element={<HTML />} />
                {/* <Route path="/blogs/CSS" element={<CSS />} />
              <Route path="/blogs/JavaScript" element={<JavaScript />} />*/}
                <Route path="/blogs/React" element={<React_page />} />
                <Route path="/projects/:id" element={<Viewproject isdark={isdark} />} />
                <Route path="/chatGPT" element={<Chat isdark={isdark} />} />
                <Route path="/*" element={<NotFound isdark={isdark} />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by 李快乐
          </Footer>

        </Layout>

      </Layout>
      <FloatButton.BackTop />
    </ConfigProvider>

  );

};
export default Blog;