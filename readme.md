#### 2017-12-11

1. 什么是jsx? 新建一个组件的格式是什么?

>jsx是一种在js中书写标签模板的写法.
```jsx
const element = const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
```

>在jsx中使用js表达式使用大括号包裹

```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
// 上下两段作用完全相同, JSX是React.createElement()的语法糖
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
标签中的参数会被作为props对象中的属性.

新建一个组件的格式:

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
// 或者
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

1. function与class定义组件的区别?
function中只能写render的部分
class的写法,函数体移动到render函数中,this.props替换掉props
```jsx
constructor (props) {
   super(props);
   // this.state = {};
}
```
3. 使用setState时,如果要利用state中的值运算,要注意state是异步更新的,应使用

```jsx
this.setState((prevState, props) => ({
    counter: prevState.counter + props.increment 
}))
```
4. rn中使用flex无需在父元素声明display: flex.

#### 2017-12-12

1. 循环渲染组件时,直接在jsx中使用数组,需要为item加key

2. FlatList,设置data和renderItem

```jsx
<FlatList
  data={[
    'Scroll me plz', 'If you like', 'Scrolling down', `What's the best`, 'Framework around?', 'React Native'
  ]}
  renderItem={(item)=><Kuai text={item}/>}
/>
```

3. Fetch
```jsx
// url (必须), options (可选)
fetch('/some/url', {
    method: 'get'
}).then(function(response) {
}).catch(function(err) {
});
// 创建一个空的 Headers 对象,注意是Headers，不是Header
var headers = new Headers();

// 添加(append)请求头信息
headers.append('Content-Type', 'text/plain');
headers.append('X-My-Custom-Header', 'CustomValue');

// 判断(has), 获取(get), 以及修改(set)请求头的值
headers.has('Content-Type'); // true
headers.get('Content-Type'); // "text/plain"
headers.set('Content-Type', 'application/json');

// 删除某条请求头信息(a header)
headers.delete('X-My-Custom-Header');

// 创建对象时设置初始化信息
var headers = new Headers({
    'Content-Type': 'text/plain',
    'X-My-Custom-Header': 'CustomValue'
});
var request = new Request('/some-url', {
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
});
fetch(request).then(function() { /* handle response */ });

var request = new Request('/users.json', {
    method: 'POST', 
    mode: 'cors', 
    redirect: 'follow',
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
});
```
注意,在rn中,如果使用async,需要`responseJson = await response.json()`
4. React中用不着v-if这种奇怪的属性来控制组件显示,直接使用if来选择不同的jsx,或者使用&&符号

```jsx
<div>
    <h1>Hello!</h1>
    {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
    }
</div>
```
5. 在render方法中`return null`来阻止渲染.
6. [React表单](https://doc.react-china.org/docs/forms.html)
```jsx
//constructor
this.state = {value: ''};

handleChange(event) {
    this.setState({value: event.target.value.toUpperCase()});
}
//render
<input type="text" value={this.state.value} onChange={this.handleChange} />

```

#### 2017-12-13
1.状态提升: 将子组件的数据/函数,以props的方式在父组件中定义并传递进去,子组件中尽量减少与夫组件耦合的细节保持抽象,这些属性方法的实现细节都通过参数传递.
```jsx
// 小组件不需要state,所以也不需要用class定义
function BoilingVerdict(props) {
  if (props.celsius >=100) {
    return <p>水会烧开</p>;
  } else return <p>水不会烧开</p>;
}
// vue中类似computed这种逻辑方法,不放在组件中,直接定义成全局函数
function toCelsius (fahrenheit) {
  return (fahrenheit-32)*5/9;
}
function toFahrenheit (celsius) {
  return celsius*9/5+32;
}
function tryConvert(temperature, convert) {
  const input = Number.parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output*1000)/1000;
  return rounded.toString();
}
// 子组件的细节也不要在组件内定义.
const scaleNames = {
  'c': '摄氏度',
  'f': '华氏度'
}

class TemperatureInput extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }
  render(){
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>输入{scaleNames[scale]}</legend>
        <input type="text" value={temperature} onChange={this.handleChange}/>
      </fieldset>
    );
  }
}

class Calculator extends Component {
  constructor (props) {
    super(props);
    this.state = {
      temperature: '',
      scale: 'c'
    }
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }
  handleCelsiusChange(temperature){
    this.setState({scale: 'c', temperature});
  }
  handleFahrenheitChange(temperature){
    this.setState({scale: 'f', temperature});
  }
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale==='f'? tryConvert(temperature, toCelsius): temperature;
    const fahrenheit = scale==='c'? tryConvert(temperature, toFahrenheit): temperature;
    return (
      <div>
        <TemperatureInput 
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}/>
        <TemperatureInput 
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}/>
        <BoilingVerdict celsius={celsius}></BoilingVerdict>
      </div>
    );
  }
}

```
周四周五看Redux
下周要坑的笔记,看完,logindemo源码
周四下午前写完5 三张图
