import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';

import styles from 'styles/App.scss';

@immutableRenderDecorator
@CSSModules(styles, { allowMultiple: true })
class TabPane extends Component {
    static propTypes = {
        //Tab属性是Tab自定义头部，可传入字符串或节点
        tab: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
        ]).isRequired,

        order: PropTypes.string.isRequired,
        disable: PropTypes.bool,
        isActive: PropTypes.bool,
    };

    render() {
        const {isActive, children} = this.props;
        const classes = classnames({
            panel: true,
            contentActive: isActive,
        });

        return (
            <div
                role='tabpanel'
                styleName={classes}
                aria-hidden={!isActive}
                >
                {children}
            </div>
        );
    }
}

export default TabPane;