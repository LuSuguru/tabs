import React, { Component, PropTypes } from 'react';

import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';

import styles from 'styles/App.scss';

@immutableRenderDecorator
@CSSModules(styles, { allowMultiple: true })
class TabContent extends Component {
    static propTypes = {
        panels: PropTypes.object,
        activeIndex: PropTypes.number,
        isActive: PropTypes.bool,
    };

    getTabPanes() {
        const {activeIndex, panels} = this.props;

        return panels.map((child) => {
            if(!child) return;

            const order = parseInt(child.props.order,10);
            const isActive = (activeIndex === order);

            return React.cloneElement(child, {
                isActive,
                children:child.props.children,
                key: `tabpane-${order}`
            });
        });
    }

    render() {
        const classes = classnames({
            content: true
        });

        return (
            <div styleName={classes}>
                {this.getTabPanes()}
            </div>
        );
    }
}

export default TabContent;