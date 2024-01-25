import React, {useState, useRef} from "react"
import Trigger from 'rc-trigger';
import "rc-trigger/assets/index.css"
import "./index.css"

const Popconfirm = (props) => {
    let popRef = useRef()
    let {children, title, onConfirm, okText = ''} = props;
    let [visible, setVisible] = useState(false)
    const onSubmit = () => {
        setVisible(false)
        onConfirm()
    }
    return (
        <Trigger
            ref={popRef}
            popupVisible={visible}
            onPopupVisibleChange={() => {
                setVisible(true)
                // popRef.current.close()

            }}
            action={['click']}
            popup={
                <div className={'confirmModal'}>
                    {/*<div className={'popover-arrow'}></div>*/}
                    <div>
                        {title}
                    </div>
                    <div className={'btn-box'}>
                        <button type="button" className="btn app-light-btn app-xs"
                                onClick={() => {
                                    setVisible(false);
                                    // popRef.current.close()
                                }}
                        ><span>No</span></button>
                        {' '}
                        <button type="button" className="btn app-btn app-xs" onClick={() => {
                            onSubmit()
                        }}><span>{okText ? okText : 'Yes'}</span>
                        </button>
                    </div>
                </div>
            }
            popupAlign={{
                points: ['bc', 'tc'],
                offset: [-109, -25]
            }}
            alignPoint
            destroyPopupOnHide
            maskClosable>
            {children}
        </Trigger>
    )
}
export default Popconfirm
