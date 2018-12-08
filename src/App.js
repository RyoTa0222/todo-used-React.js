//ファイルのインポート
import React, { Component } from 'react';
import {List} from './list.js'
import {Input} from './input.js'
import './App.css'
import Loader from 'react-loader-spinner'


//親コンポーネント(app)
class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            todo: [
                {title: 'Javascript覚える'},
                {title: 'jQuery覚える'},
                {title: 'ES2015覚える'},
                {title: 'React覚える'},
                {title: '隼人を倒す'},
            ]};
        //イベントハンドラー関数にthisをバインド
        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.changeTodo = this.changeTodo.bind(this);
    }

    //ローディング
    componentWillMount() {
        setTimeout( function() {
            document.getElementById("icon_loading").style.display = "none";
                document.getElementById("main_todo").style.display = "block";}
            , 3000 );
    }

    //新規追加
    addTodo(value){
        //追加
        this.state.todo.push({
            title: value
        });
        //更新
        this.setState({
            todo : this.state.todo
        });
    }
    //取り消し機能
    deleteTodo(todo, i){
        //コピー
        const todo_delete = this.state.todo.slice();

        //取り消し線
        todo_delete[i] = {title: <del>{todo.title}</del>};
        //更新
        this.setState({
            todo : todo_delete
        });
    }

    //変更と保存
    changeTodo(i){
        //コピー
        const todo_update = this.state.todo.slice();
        //dialog表示
        const dialog = window.prompt("変更内容を保存します", "");
        //変更
        if(dialog.length === 0){
            window.alert('キャンセルされました');


        }else{
            todo_update[i] = {title: dialog};
        }


        //更新
        this.setState({
            todo : todo_update
        });
    }

    render() {
    return (
      <div className="todo">
          <div id="main_todo">
              <div className="title_group">
                  <h1 className="title">TODOアプリ</h1>
              </div>
              <List todo={this.state.todo}
                    deleteTodo={this.deleteTodo}
                    changeTodo={this.changeTodo}/>
              <Input addTodo={this.addTodo} />
          </div>
          <div id="icon_loading" className="icon_loading">
              <Loader
                  type="CradleLoader"
                  color="#000"
                  height="100"
                  width="100"
              />
          </div>
      </div>
    );
  }
}

export default App;
