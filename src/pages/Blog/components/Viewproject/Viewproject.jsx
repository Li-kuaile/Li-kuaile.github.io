import React, { useEffect,useState } from 'react'
import { useParams } from'react-router-dom'
import projects from '../../../../data/projects.json';
import ReactMarkdown from 'react-markdown'
import 'github-markdown-css';
import rehypeHighlight from "rehype-highlight";
// import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css';
import "highlight.js/styles/atom-one-dark.css";
import styles from './Viewproject.module.css'
import { Button } from 'antd';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// let carouselimg=[
//     '1.jpg',
//     '2.jpg',
//     '3.jpg',    
//     '4.jpg',
//     '5.jpg'
// ]

export default function Viewproject(props) {
  let { id } = useParams();
  let {isdark}=props;
  let project = projects.find(project => project.id == id);

//   const [activeIndex, setActiveIndex] = React.useState(0);
//   const [timer, setTimer] = React.useState(null)

//   const handleClick=(index)=>{
//     clearTimeout(timer)
//     setActiveIndex(index)
//   }
//   useEffect(() => {
//     setTimer(setTimeout(()=> {
//         setActiveIndex((activeIndex+1)%carouselimg.length)     
//     }, 1500))
//   }, [activeIndex])
    const [mdContent, setMdContent] = useState('')
    useEffect(() => {
        fetch(project.url)
            .then(response => response.text())
            .then(text => {
                setMdContent(text);
            })
            .catch(error => console.error('Error fetching markdown file:', error));
    }, []);

    // const [todolist, setTodoList]=useState([]);
    // const handleTodoChange=(e,index)=>{
    //     let newTodoList=todolist.map((item,i)=>{
    //         if(i===index){
    //             return {...item,isDone:e.target.checked}
    //         }
    //         return item
    //     })
    //     setTodoList(newTodoList)
    // }

    // const input_ref=React.createRef();
    
    
  return (
    <div style={{padding: '20px'}}>
        <Link to='/blog/projects'>
        <Button type="primary" icon={<DoubleLeftOutlined />} style={{width: '100px',  marginBottom: '20px'}}>
        Back
        </Button>
        </Link>
        <header style={{fontSize: '32px', fontWeight: 'bold',marginBottom: '20px'}}>{project.title}</header>
        <div style={{background:'transparent'}}>
            <ReactMarkdown children={mdContent} className={`markdown-body ${isdark?styles.bg:''}`} style={{flex:1}} rehypePlugins={[rehypeHighlight]}></ReactMarkdown>
            
            {/* <div className={styles.carousel}>
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
            </div> */}

            {/* <div className={styles.todo}>
                <div className={styles.todoInput}>
                    <input ref={input_ref} type='text' placeholder='Add a new item'/>
                    <button onClick={()=>{setTodoList([...todolist,{checked:false,content:input_ref.current.value}]);input_ref.current.value=''}}>Add</button>
                </div>
                <ul className={styles.todolist}>
                {
                    todolist.map((item,index) => (
                        <li key={index}>
                            <div>
                                <input type='checkbox' checked={item.isDone} onChange={(e)=>handleTodoChange(e,index)}/>
                                {item.content}
                            </div>
                            <button onClick={()=>setTodoList(todolist.filter((_,i)=>i!==index))}>X</button>
                        </li>
                    ))
                }
                <span>全选</span>
                <input type='checkbox' style={{margin: '20px 10px'}} onChange={(e)=>{
                    if (e.target.checked) {
                        setTodoList(todolist.map(item=>({...item,isDone:true})))
                    }else{
                        setTodoList(todolist.map(item=>({...item,isDone:false})))
                    }
                    }} checked={todolist.length>0&&todolist.every(item=>item.isDone===true)} defaultChecked={false}/>
                <br />
                <span>当前选择{todolist.filter(item=>item.isDone).length}条/共{todolist.length}条</span>
                </ul>
            </div> */}
            
            
        </div>
    </div>
  )
}
