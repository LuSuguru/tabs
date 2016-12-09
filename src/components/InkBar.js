import React, { Component } from 'react';

import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';

import styles from 'styles/App.scss';

@immutableRenderDecorator
@CSSModules(styles, { allowMultiple: true })
class InkBar extends Component {
    render() {
        const {left, width} = this.props;
        const classes = classnames({
            inkBar: true,
        });
        return (
            //通过translate3D加速动画的渲染效果
            <div styleName={classes} style={
                {
                    WebkitTransform: `translate3d(${left}px, 0, 0)`,
                    transform: `translate3d(${left}px, 0, 0)`,
                    width: width,
                }
            }>
            </div>
        );
    }
}

export default InkBar;