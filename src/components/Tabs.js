import React, { Component, PropTypes } from 'react';

import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import { Seq } from 'immutable';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';

import TabNav from 'components/TabNav';
import TabContent from 'components/TabContent';
import Emitter from 'components/events';

import styles from 'styles/App.scss';

@immutableRenderDecorator
@CSSModules(styles, { allowMultiple: true })
class Tabs extends Component {
    //规定Props的类型
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]),

        defaultActiveIndex: PropTypes.number,
        activeIndex: PropTypes.number,
        onChange: PropTypes.func,
    };

    constructor(props) {
        super(props);

        const currProps = this.props;
        let activeIndex;
        activeIndex = currProps.defaultActiveIndex;

        //利用了Immutable的Seq封装children数组，
        //seq的数据不可变，计算具有延迟性
        this.immChildren = Seq(currProps.children);
        this.handleTabClick = this.handleTabClick.bind(this);

        //初始化activeIndex state
        this.state = {
            activeIndex,  //传入的activeIndex
            prevIndex: activeIndex  //当前的activeIndex
        };
    }

    handleTabClick(activeIndex) {
        const prevIndex = this.state.activeIndex;

        //如果当前activeIndex与传入的activeIndex不一致，
        //并且props中存在defaultActiveIndex时，则更新
        if (this.state.activeIndex !== activeIndex &&
            'defaultActiveIndex' in this.props) {
            this.setState({
                activeIndex,
                prevIndex
            });
        }
    }

    /**
     * 将点击的回调函数放到全局Event中
     */
    componentDidMount() {
        this.itemChange = Emitter.on('itemChange', (activeIndex) => {
            this.handleTabClick(activeIndex);
        });
    }

    componentWillUnmount() {
        Emitter.removeListener(this.itemChange);
    }

    /**
     * Tabs控制部分
     */
    renderTabNav() {
        return (
            <TabNav
                key='tabBar'
                onTabClick={this.handleTabClick}  //传递给子组件的回调函数
                panels={this.immChildren}
                activeIndex={this.state.activeIndex}
                />
        );
    }

    /**
     * Tabs内容部分
     */
    renderTabContent() {
        return (
            <TabContent
                key='tabContent'
                activeIndex={this.state.activeIndex}
                panels={this.immChildren}
                />
        );
    }

    render() {
        const { className} = this.props;
        const cx = classnames(className,'ui-tabs');

        return (
            <div className={cx}>
            {this.renderTabNav()}
            {this.renderTabContent()}
            </div>
        );
    }
}

export default Tabs;