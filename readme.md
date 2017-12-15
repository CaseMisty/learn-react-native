## 2017-12-11

1. 什么是jsx? 新建一个组件的格式是怎样?
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
  <h1 className="greetinga">
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
>标签中的参数会被作为props对象中的属性.

新建一个组件的格式:
```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
// 或者
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

2. function与class定义组件的区别？
>function中只能写render的部分
>class的写法,函数体移动到render函数中,this.props替换掉props
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

## 2017-12-12

1. 循环渲染组件时,直接在jsx中使用数组,需要为item加key

2. FlatList,设置data和renderItem
```jsx
<FlatList
  data={[
    'Scroll me plz', 'If you like', 'Scrolling down', `What's the best`, 'Framework around?', 'React Native'
  ]}
  renderItem={({item})=><Kuai text={item}/>}
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

## 2017-12-13
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
2. JSX
JSX对象必须声明, 首字母必须大写. 传递属性时字符串常量与{''}表达式等价, 未给属性值传值时值默认为true.
```jsx
const props = {firstName: 'Ben', lastName: 'Hector'};
return <Greeting {...props} />; // 有多个值要传时, 使用解构直接全部传递
```
类似<solt>, 任何处于jsx中间的标签/表达式/函数/HTML元素/JSX都可以作为props.children传递, 而false,null,undefined,true都会被忽略为空字符串

3. [PropTypes](参数类型检查https://doc.react-china.org/docs/typechecking-with-proptypes.html)
```jsx
import PropTypes from 'prop-types';
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}
Greeting.propTypes = {
  name: PropTypes.string // 一个简单的例子
};
```

4. 下周安排
周四周五看Redux
下周要坑的笔记,看完,logindemo源码
周四下午前写完5 三张图

## 2017-12-14
1. 创建store , 同时指定reducer， 同一个项目只有一个store， 为统一仓库， 有三个常用方法
```js
import { createStore } from 'redux';
const store = createStore(fn);
```
2. 获取store的快照: `store.getState()`
```js
import {createStore} from 'redux';
const store = createStore(reducer);
// store的三个常用方法
let { subscribe, dispatch, getState } = createStore(reducer);
const state = store.getState();
```
3.View发出Action —— `store.dispatch()`
```js
/**
 * { 一个action creater }
 */
function addTodo(text) {
  const ADD_TODO = '添加 ToDo'
  return {
    type: ADD_TODO,
    text
  }
}
// View发出Action的唯一方法: store.dispatch
store.dispatch(addTodo('learn Redux')
```
4. Reducer:为state onchange添加的listener —— `store.subscribe(reducer)`
类似Array.prototype.reduce的第一个参数, 具体在[Redux 入门教程（上）](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

5. 流程:

用户发出Action
```js
store.dispatch(action);
```

store自动调用reducer, 返回新的state
```js
let nextState = todoApp(previousState, action);
```

state一旦发生变化,store就调用监听函数更新view
```js
store.subscribe(listener);
```

6. 困惑：以上这些api只是了解了用法，却难以直观体会到在何时用到，还是得在有相关需求时才能更深入理解。
第二篇中间件虽是逐句看完了，却有很多地方只能理解大概，比如redux-promise中间件。
```js
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(promiseMiddleware)
); 
const fetchPosts = 
  (dispatch, postTitle) => new Promise(function (resolve, reject) {
     dispatch(requestPosts(postTitle));
     return fetch(`/some/API/${postTitle}.json`)
       .then(response => {
         type: 'FETCH_POSTS',
         payload: response.json()
       });
});
```

## 2017-12-15
### [React-Redux基础](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html#comment-377237)
1. React-Redux组件分为两类： UI组件和容器组件， UI只用this.props负责展示， 容器只负责逻辑.
1. 使用concat方法，从UI组件生成容器组件
```js
import { connect } from 'react-redux'

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
```
3. mapStateToProps()
用于建立从state对象到props对象的映射关系。
>`mapStateToProps()`建立从`state`对象到`props`对象的映射关系，返回一个对象。

>`mapStateToProps`会订阅 `Store`，每当`state`更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。

>`mapStateToProps`的第一个参数总是`state`对象，还可以使用第二个参数，代表容器组件的`props`对象。

使用ownProps作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。
connect方法可以省略mapStateToProps参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。

4. mapDispatchToProps
定义哪些用户的操作应该当做Action映射到对应的`store.dispatch()`
可以是一个函数或对象
当它是函数时，会得到两个参数：`dispatch`和`ownProps`
当它是对象时，他的每个key-name是对应UI组件的同名参数，key-value应该是一个函数，作为Action Creater，返回的Action会由Redux自动发出

5. 使用顺序总结
* 首先创建一个纯UI组件，其中包含需要从`state`计算得到的值，以及需要发出Action的操作
* 定义mapStateToProps(state)  建立到`state`的映射
```js
function mapStateToProps(state) {
  return {
    value: state.count
  }
}
```
* 定义mapDispatchToProps(dispatch)  建立到`dispatch`的映射
```js
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}
const increaseAction = { type: 'increase' }
```
* 调用connect生成容器
```js
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
```
* 定义Reducer
```js
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}
```
* 使用中间件，生成store，使用Provider