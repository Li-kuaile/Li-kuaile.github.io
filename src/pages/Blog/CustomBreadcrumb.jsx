import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
 

const generateBreadcrumbs = (data, pathnames, breadcrumbs) => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.path === pathnames || pathnames.startsWith(item.path)) {
      // pathnames.shift();
      breadcrumbs.push(item);
      if (item.children) {
        generateBreadcrumbs(item.children, pathnames, breadcrumbs);
      }
      break;
    }
  }
};

const CustomBreadcrumb = ({data}) => {

  const location = useLocation();
  const pathnames = location.pathname//.split('/').filter((x) => x);
  const breadcrumbs = [];
  generateBreadcrumbs(data, pathnames, breadcrumbs);
  // console.log(breadcrumbs)

  return (
    <Breadcrumb
    separator=">"
    items={
      breadcrumbs.map((item, index) => (
        index === breadcrumbs.length - 1 ? (
          {
            'title': item.meta.title
          }
        ) : (
          {
            'title':item.meta.title,
            'href':item.path,
          }
        )
    ))}
    style={{marginBottom: '10px',fontSize: '16px'}}
    >

    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
