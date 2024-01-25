import React from "react"
import Tabs, {TabPane} from "rc-tabs";

import "rc-tabs/assets/index.css";
import "./index.css";

const TabsComponent = (props) => {
    let {children, position = 'top', defaultTabKey = 0, onChange = {}} = props;
    return (
        <Tabs tabPosition={position} defaultActiveKey={defaultTabKey} onChange={onChange}>
            {children}
        </Tabs>
    )
}

export default TabsComponent
TabsComponent.TabPane = TabPane;
