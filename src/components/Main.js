//导入默认样式
require('normalize.css/normalize.css');

//导入设置的样式
require('styles/App.scss');

import React, { Component } from 'react';
import Tabs from 'components/Tabs';
import Tabpane from 'components/TabPane';
import Emitter from 'components/events';

class App extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            activeIndex: 0,
        };
    }

    handleChange(e) {
        let index = parseInt(e.target.value, 10);
        Emitter.emit('itemChange', index);

        this.setState({
            activeIndex: index,
        });
    }

    render() {
        return (
            /*外部选择模块*/
            <div>
                <div className="operator">
                    <span>切换 Tab: </span>
                    <select value={this.state.activeIndex}
                        onChange={this.handleChange}>
                        <option value="0">Tab 1</option>
                        <option value="1">Tab 2</option>
                        <option value="2">Tab 3</option>
                    </select>
                </div>
                {/*内部选择模块*/}
                <Tabs defaultActiveIndex={this.state.activeIndex}
                    className="tabs-bar">
                    {/* 只是定义内容区域的子组件集合，
                     头部区域对应内部区域每一个Tabpane
                     组件的props，让其在TabNav组件内组装 */}
                    <Tabpane order="0" tab={'Tab 1'}>第一个 Tab 里的内容</Tabpane>
                    <Tabpane order="1" tab={'Tab 2'}>第二个 Tab 里的内容</Tabpane>
                    <Tabpane order="2" tab={'Tab 3'}>第三个 Tab 里的内容</Tabpane>
                </Tabs>
            </div >
        );
    }
}

export default App;