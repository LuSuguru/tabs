import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import { Motion, spring } from 'react-motion';


import styles from 'styles/App.scss';
import InkBar from 'components/InkBar';

/**
 * 获取组件的宽度
 */
function getOuterWidth(el) {
    return el.offsetWidth;
}

/**
 * 获取一个组件相对窗口位置的对象
 */
function getOffset(el) {

    //el.ownerDocument返回根节点，即document
    const html = el.ownerDocument.documentElement;
    const box = el.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset - html.clientTop,
        left: box.left + window.pageXOffset - html.clientLeft
    };
}

@immutableRenderDecorator
@CSSModules(styles, { allowMultiple: true })
class TabNav extends Component {
    static PropTypes = {
        panels: PropTypes.object,
        activeIndex: PropTypes.number
    };

    constructor(props) {
        super(props);

        this.state = {
            inkBarWidth: 0,
            inkBarLeft: 0
        };
    }

    //计算激活的Tab的宽度和相对屏幕左侧的位置
    getel() {
        const {activeIndex} = this.props;
        const node = ReactDOM.findDOMNode(this);
        const el = node.querySelectorAll('li')[activeIndex];

        this.setState({
            inkBarWidth: getOuterWidth(el),
            inkBarLeft: getOffset(el).left,
        });
    }

    componentDidMount() {
        //计算激活的Tab的宽度和相对屏幕左侧的位置
        this.getel();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeIndex !== this.props.activeIndex) {
            this.getel();
        }
    }

    getTabs() {
        const {panels, activeIndex} = this.props;

        return panels.map((child) => {  //通过map遍历子组件
            if (!child) return;

            //获取Tabs子组件的order值
            const order = parseInt(child.props.order, 10);

            let classes = classnames({
                tab: true,
                tabActive: (activeIndex == order)
            });

            //增加点击事件
            let events = this.props.onTabClick.bind(this, order);

            return (
                <li
                    role="tab"
                    //加上aria可用于WEB应用定义出能够被屏幕阅读器这样的辅助技术理解
                    aria-selected={activeIndex === order ? 'true' : 'false'}
                    onClick={events}
                    styleName={classes}
                    key={order}
                    >
                    {/*用Tabs子组件的Tab属性做Tab头内容*/}
                    {child.props.tab}
                </li>
            );
        });
    }

    render() {
        const rootClasses = classnames({
            bar: true,
        });
        const classes = classnames({
            nav: true,
        });

        return (
            <div styleName={rootClasses} role="tablist">

                {/*利用Motion做Tabs长条的水平移动效果，缓动函数选用spring */}
                <Motion style={{ left: spring(this.state.inkBarLeft) }}>
                    {({left}) => <InkBar width={this.state.inkBarWidth}
                        left={left} />}
                </Motion>
                <ul styleName={classes}>
                    {this.getTabs()}
                </ul>
            </div>
        );
    }
}

export default TabNav;