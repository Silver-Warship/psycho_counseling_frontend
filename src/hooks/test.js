class Mock {
  constructor() {
    let count = 0;
    setInterval(() => {
      this.onmessage('hello world' + count);
      count++;
    }, 10000);
  }

  send(data) {
    // 随机延迟
    const delay = Math.random() * 1000;
    setTimeout(() => {
      switch (data) {
        case 'hello':
          this.onmessage('world');
          break;

        case 'world':
          this.onmessage('hello');
          break;

        case '你好':
          // 随机是否返回
          if (Math.random() > 0.5) {
            this.onmessage('好个der');
          }
          break;

        default:
          this.onmessage(data);
          break;
      }
    }, delay);
  }

  onmessage = (data) => {};
}

class MockHelper {
  constructor() {
    // 用于存储消息处理器
    this.messageHandlers = [];

    // 模拟消息发送（websocket）
    this.mock = new Mock();

    // 模拟消息接收
    this.mock.onmessage = (data) => {
      // 熔断器
      let fusing = false;
      const fused = () => {
        fusing = true;
      };

      // 执行消息处理
      for (let i = 0; i < this.messageHandlers.length; i++) {
        const handler = this.messageHandlers[i];
        try {
          // 执行消息处理器
          handler.handle(data, fused);
        } catch (e) {
          // 消息处理器执行失败
          handler.reject(e);
          this.messageHandlers.splice(i, 1);
          i--;
        }

        // 熔断
        if (fusing) {
          this.messageHandlers.splice(i, 1);
          return;
        }
      }

      this.onmessage(data);
    };
  }

  send(data, handler) {
    // 返回一个 Promise
    return new Promise((resolve, reject) => {
      // 创建消息处理器
      const messageHandler = new MessageHandler();
      messageHandler.callback = handler;
      messageHandler.resolve = resolve;
      messageHandler.reject = reject;
      messageHandler.data = data;

      // 设置超时，3s
      messageHandler.timer = setTimeout(() => {
        messageHandler.reject(new Error('timeout'));
        this.messageHandlers.splice(
          this.messageHandlers.indexOf(messageHandler),
          1
        );
      }, 3000);

      // 添加到消息处理器列表
      this.messageHandlers.push(messageHandler);

      // 发送消息
      this.mock.send(data);
    });
  }

  onmessage() {}
}

// 消息处理器
class MessageHandler {
  constructor() {
    this.callback = null;
    this.timer = null;
    this.resolve = null;
    this.reject = null;
    this.data = null;
  }

  // 处理消息
  handle(data, fused) {
    // 消息处理结果
    let result = {
      sendData: this.data,
      receiveData: data,
      handleData: null,
    };

    // 熔断器
    const _fused = () => {
      // 收到熔断信号，清除定时器
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      // 执行上层的熔断函数
      fused();

      // 执行 resolve
      if (this.resolve) {
        // 这里需要等待回调函数执行完毕，才能执行 resolve，这样才能拿到 handleData
        Promise.resolve().then(() => {
          this.resolve(result);
          this.resolve = null;
        });
      }
    };

    // 执行回调函数
    if (typeof this.callback === 'function') {
      try {
        result.handleData = this.callback(data, _fused);
      } catch (e) {
        this.reject(e);
        throw e;
      }
    }
  }
}

const mockHelper = new MockHelper();
mockHelper.onmessage = (data) => {
  insertResult({
    receiveData: data,
  });
};

document.getElementById('hello').addEventListener('click', () => {
  mockHelper
    .send('hello', (data, fused) => {
      if (data === 'world') {
        fused();
        return 'hello world';
      }
    })
    .then(insertResult);
});

document.getElementById('world').addEventListener('click', () => {
  mockHelper
    .send('world', (data, fused) => {
      if (data === 'hello') {
        fused();
        return 'hello world';
      }
    })
    .then(insertResult);
});

document.getElementById('你好').addEventListener('click', () => {
  mockHelper
    .send('你好', (data, fused) => {
      if (data === '好个der') {
        fused();
        return;
      }
    })
    .then(insertResult)
    .catch((err) => {
      insertResult({
        sendData: '你好',
        receiveData: '超时未回复',
      });
    });
});

document.getElementById('text').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const value = e.target.value;
    if (value) {
      mockHelper
        .send(value, (data, fused) => {
          if (data === value) {
            fused();
          }
        })
        .then((data) => {
          e.target.value = '';
          insertResult(data);
        });
    }
  }
});

const result = document.getElementById('result');
function insertResult(data) {
  const messageItem = document.createElement('div');
  messageItem.classList.add('message-item');

  const time = document.createElement('span');
  time.classList.add('time');
  time.innerText = new Date().toLocaleTimeString();
  messageItem.appendChild(time);

  if (data.sendData) {
    const send = document.createElement('p');
    send.innerText = '发送：' + data.sendData;
    messageItem.appendChild(send);
  }

  const receive = document.createElement('p');
  receive.innerText = '收到：' + data.receiveData;
  messageItem.appendChild(receive);

  result.appendChild(messageItem);

  // xingx
  // setTimeout(() => {
  //   messageItem.scrollIntoView({
  //     behavior: 'smooth'
  //   })
  // })
}
