import React, { useEffect } from 'react'
import styles from './Chat.module.css'
import { Button, message, Input  } from 'antd';
export default function Chat() {
    const API_KEY = "sk-BROyL7XYdSKN1bZd78A17cB8A7B04c35B989BeC4934863Fe";
    const ENDPOINT = "https://free.gpt.ge/v1/chat/completions";
    const ref=React.createRef();
    const [children, setChildren] = React.useState([]);
    // 历史消息
    const messages = [];
    const chatBoxRef=React.createRef();
    // 等待
    let waiting = false;

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
        type: 'success',
        content: '发送成功',
        });
    };
    const errorInfo = () => {
        messageApi.open({
        type: 'error',
        content: '获取失败',
        });
    };
    const warning_input = () => {
        messageApi.open({
        type: 'warning',
        content: '请输入内容',
        });
    };
    const warning = () => {
        messageApi.open({
        type: 'warning',
        content: '等待回复中',
        });
    };

    function sendMessage() {
        // 等待
        if (waiting) {
            warning();
            return;
        }
        waiting = true;
        // 获取到用户的输入
        const message = ref.current.input.value.trim();
        // 判断用户输入是否为空
        if (message === '') {
            warning_input();
            waiting = false;
            return;
        }
        // 将用户输入显示在聊天框中
        displayUserMessage(message);
        success();
        ref.current.value = '';
        // 创建ChatGPT的回复，并获取到显示回复的容器
        const htmlSpanElement = displayChatGPTMessageAndGetContainer();
        // 发送消息到ChatGPT
        addMessage("user", message);
        const body = JSON.stringify({model: "gpt-3.5-turbo", messages: messages, stream: true});
        ssePost(
            // 请求地址
            ENDPOINT,
            // 请求头
            {"Content-Type": "application/json", Authorization: "Bearer " + API_KEY },
            // params，这里没有参数
            {},
            // body
            body,
            // 收到事件时的回调。这里将事件的data显示在htmlSpanElement中
            (event) => {const content = getContent(event.data); if (content) htmlSpanElement.innerHTML += content},
            // 结束时的回调。1.将消息添加到历史消息中 2.将等待状态设置为false
            () => {addMessage("assistant", htmlSpanElement.innerHTML); waiting = false},
            // 发生错误时的回调
            (error) => {errorInfo()}
        );
    }

    // 匹配回复内容的正则表达式
    const contentPattern = /"content":"(.*?)"/;

    /**
     * 获取回复内容
     * @param data 数据
     * @returns 回复内容
     */
    function getContent(data) {
        const match = data.match(contentPattern);
        if (match) {
            return match[1];
        } else {
            return null;
        }
    }


    /**
     * 将消息添加到历史消息中
     * @param role 角色。user或者assistant
     * @param content 消息内容
     */
    function addMessage(role, content) {
        messages.push({role: role, content: content});
    }

    // ----------
    function isZero(num){
        return (num < 10 ? '0' : '') + num;
    }
    function getDateTime(){
        let datetime=new Date;
        let year=datetime.getFullYear();
        let month=isZero(datetime.getMonth()+1);
        let day=isZero(datetime.getDate());
        let hour=isZero(datetime.getHours());
        let minute=isZero(datetime.getMinutes());
        let seconds=isZero(datetime.getSeconds());
        let date=year+'/'+month+'/'+day+' '+hour+':'+minute+":"+seconds;
        return date;
    }

    
    
    /**
     * 将用户输入显示在聊天框中
     * @param text 用户的输入
     */
    function displayUserMessage(text) {
        
        // const cutDiv = <div style={{textAlign: "right"}}><span className={styles.sender}>You </span><span className={styles.youDatatime}>{getDateTime()}</span> </div>;
        // const senderSpan = `<span className=${styles.sender}>You </span>`;
        // const timeSpan = `<span className=${styles.youDatatime}>${getDateTime()}</span>`;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add(styles.message);
        
        const cutDiv = document.createElement('div');
        cutDiv.style.textAlign = 'right';
        const senderSpan = document.createElement('span');
        senderSpan.classList.add(styles.sender);
        senderSpan.textContent = 'You ';

        const timeSpan = document.createElement('span');
        timeSpan.classList.add(styles.youDatatime);
        timeSpan.textContent = getDateTime();

        cutDiv.appendChild(timeSpan);
        cutDiv.appendChild(senderSpan);

        // const cutDiv2 = <div style={{textAlign: "right",marginTop: "5px"}}><p className={styles.myself_chat}>{text}</p></div>
        

        const cutDiv2 = document.createElement('div');
        cutDiv2.style.textAlign = 'right';
        const textSpan = document.createElement('p');
        textSpan.classList.add(styles.myself_chat);
        textSpan.textContent = text;

        cutDiv2.appendChild(textSpan);
        cutDiv2.style.marginTop = '5px';
        
        messageDiv.appendChild(cutDiv);
        messageDiv.appendChild(cutDiv2);
        // setChildren(children.concat([<div className={styles.message}> {cutDiv} {cutDiv2}</div>]));
        chatBoxRef.current.appendChild(messageDiv);
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;///////////////////////////////////////////////////////悬而不决
    }

    
    /**
     * 将ChatGPT的回复显示在聊天框中
     * @returns {HTMLSpanElement}
     */
    function displayChatGPTMessageAndGetContainer() {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(styles.message);
        
        // const cutDiv = <div><span className={styles.sender}>ChatGPT </span><span className={styles.datetime}>{getDateTime()}</span> </div>;

        const cutDiv = document.createElement('div');
        const senderSpan = document.createElement('span');
        senderSpan.classList.add(styles.sender);
        senderSpan.textContent = 'ChatGPT ';

        const timeSpan = document.createElement('span');
        timeSpan.classList.add(styles.datetime);
        timeSpan.textContent = getDateTime();

        cutDiv.appendChild(senderSpan);
        cutDiv.appendChild(timeSpan);
        // const textSpan = <p className={styles.gpt_chat} id='gpt-text'></p>;
        
        const textSpan = document.createElement('p');
        textSpan.classList.add(styles.gpt_chat);
        // console.log("textSpan",textSpan)
        // const cutDiv2 = <div style={{marginTop: "5px"}}>{textSpan}</div>
        const cutDiv2 = document.createElement('div');

        cutDiv2.appendChild(textSpan);
        cutDiv2.style.marginTop = '5px';

        messageDiv.appendChild(cutDiv);
        messageDiv.appendChild(cutDiv2);

        // setChildren(<div className={styles.message}> {cutDiv} {cutDiv2}</div>)
        
        chatBoxRef.current.appendChild(messageDiv);
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        return textSpan;
    }

    function objectToQueryString(obj) {
        return Object.keys(obj)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
            .join('&');
    }

    /**
     * 发送POST请求并处理sse事件
     * @param url 请求地址
     * @param headers 请求头
     * @param params 请求参数
     * @param body 请求体
     * @param onEvent 收到事件时的回调
     * @param onEnd 结束时的回调
     * @param onError 发生错误时的回调
     */
    function ssePost(url, headers, params, body, onEvent, onEnd, onError) {
        // 拼接url
        if (Object.keys(params).length > 0) {
            url += '?' + objectToQueryString(params);
        }
        // 发送请求
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: body,
        }).then(async response => {
            // 判断响应状态码
            if (!response.ok) {
                onError(new Error('Network response was not ok'));
                return;
            }
            // 异步处理响应流
            const reader = response.body.getReader();
            // 响应缓冲区
            let buffer = '';
            // 响应的前一个字符，用于判断一个事件是否结束
            let before = '';
            // 循环读取响应流，直到响应流结束
            while (true) {
                // 读取响应流
                const {done, value} = await reader.read();
                // 响应流结束
                if (done) {
                    break;
                }
                // 将响应流转换为文本
                const text = new TextDecoder().decode(value);
                // 遍历文本
                for (const element of text) {
                    // 判断是否为事件结束。连续两个'\n'表示一个事件结束
                    if (element === '\n' && before === '\n') {
                        // 将事件中的字段分割出来。例如：event: message \n data: hello world \n id: 123 \n\n
                        const eventAndData = buffer.substring(0, buffer.length - 1).split('\n');
                        // 将事件中的字段转换为对象, 例如：{event: message, data: hello world, id: 123}
                        const resultObject = {};
                        eventAndData.forEach(pair => {
                            const colonIndex = pair.indexOf(':');
                            if (colonIndex === -1) {
                                return;
                            }
                            resultObject[pair.substring(0, colonIndex)] = pair.substring(colonIndex + 2);
                        });
                        // 回调
                        onEvent(resultObject);
                        // 清空缓冲区
                        buffer = '';
                    } else
                    // 不是事件结束，将字符添加到缓冲区
                    {
                        before = element;
                        buffer += element;
                    }
                }
            }
            // 结束时的回调
            onEnd();
        }).catch(error => {
            // 发生错误时的回调
            onError(error);
        })
    }

    

    return (
        <div className={styles.chatContainer} id="chat-container">
            <div ref={chatBoxRef} className={styles.chatBox} id="chat-box">
                {children}
            </div>
            {/* onKeyDown={(event) => event.key === "Enter"? sendMessage() : null} */}
            <div className={styles.inputContainer}>
                <Input type="text" ref={ref} classNames={styles.userInput} placeholder="Type a message..."  onPressEnter={sendMessage} />
                {contextHolder}
                <Button className={styles.sendButton} onClick={sendMessage}>Send</Button>
            </div>

            
        </div>
    )
}
