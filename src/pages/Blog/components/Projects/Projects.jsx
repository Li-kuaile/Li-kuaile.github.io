import React, { useState } from 'react'
import { Card, Pagination, Col, Row, Divider, Flex, Tag } from 'antd';
import projects from '../../../../data/projects.json';
import { getImageurl } from "../../../../utils"
import styles from './Projects.module.css'
import { Link } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
// const { Meta } = Card;
// 改变页码的回调 page代表页码数 pageSize代表每页条数
const defaultPageSize = 8;

const tagColor = {
    "React": "cyan",
    "JavaScript": "purple",
    "HTML": "blue",
    "CSS": "green",
    "antd-design": "geekblue",
    "Markdown": "magenta",
    "JSON": "volcano",
    "React-Router-Dom": "orange",
  // <Tag color="magenta">magenta</Tag>
  //                           <Tag color="red">red</Tag>
  //                           <Tag color="volcano">volcano</Tag>
  //                           <Tag color="orange">orange</Tag>
  //                           <Tag color="gold">gold</Tag>
  //                           <Tag color="lime">lime</Tag>
  //                           <Tag color="green">green</Tag>
  //                           <Tag color="cyan">cyan</Tag>
  //                           <Tag color="blue">blue</Tag>
  //                           <Tag color="geekblue">geekblue</Tag>
  //                           <Tag color="purple">purple</Tag>
}

export default function Projects() {
  const [data, setData] = useState(projects.slice(0, defaultPageSize))
  const handlePageChange = (e) => {
    setData(projects.slice((e - 1) * defaultPageSize, e * defaultPageSize))
  }


  return (
    <>
      <div className={styles.container}>
        {
          <Row gutter={[24, 24]}>
            {
              data.map((project, id) => {
                return (
                  <Col span={8} key={id} xs={20} sm={16} md={12} lg={8} xl={6}>{
                    <Link to={`/blog/projects/${project.id}`}>
                      <Card
                        hoverable
                        cover={<img alt={project.title} src={project.imageSrc} />}
                        key={id}
                      >
                        <>
                          <h3>{project.title}</h3>
                          <div className={styles.meta}><ReactMarkdown>{project.description}</ReactMarkdown></div>
                        </>
                        <>
                          <Divider style={{ borderTop: '1px dashed #adadad', margin:'15px 0 10px 0'}}></Divider>
                          <Flex gap="4px 0" wrap="wrap">
                              {
                                project.skills.map((tag, id) => {
                                  return (
                                    <Tag key={id} color={tagColor[tag]? tagColor[tag] : "black"}>{tag}</Tag>
                                  )
                                })
                              }
                          </Flex>
                        </>
                      </Card>
                    </Link>

                  }
                  </Col>
                )
              })
            }
          </Row>
        }
      </div>
      <Pagination
        total={projects.length}
        showSizeChanger
        showQuickJumper
        defaultPageSize={defaultPageSize}
        pageSizeOptions={['8', '16', '24']}
        showTotal={(total) => `Total ${total} items`}
        onChange={page => handlePageChange(page)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '20px 0',
        }}
      />
    </>
  )
}
