import React from "react"
import Notification from 'rc-notification';
import 'rc-notification/assets/index.less';
import "./index.css"
import aiOutlineCheckCircle from "./icons/check-circle.svg"
import aiOutlineWarningCircle from "./icons/warning-circle.svg"
import aiOutlineInfoCircle from "./icons/info-circle.svg"
import aiOutlineCloseCircle from "./icons/close-circle.svg"

let notificationInstance = null;

Notification.newInstance({}, (n) => notificationInstance = n);


const ContentBox = (props) => {
    let {message, description} = props;
    return (
        <>
            <div className={'rc-notification-notice-message'}>{message}</div>
            {description ? <div className={'rc-notification-notice-description'}>{description}</div> : null}
        </>
    )
}

const ImageComponent = (props) => {
    let {file, className} = props;
    return (
        <span className={className}>
            <img src={file}/>
        </span>
    )
}

const getIcon = (type) => {

    if (type == 'success') {
        return <ImageComponent className={`icon rc-notification-notice-icon-${type}`} file={aiOutlineCheckCircle}/>
    } else if (type == 'warning') {
        return <ImageComponent className={`icon rc-notification-notice-icon-${type}`} file={aiOutlineWarningCircle}/>
    } else if (type == 'error') {
        return <ImageComponent className={`icon rc-notification-notice-icon-${type}`} file={aiOutlineCloseCircle}/>
    } else {
        return <ImageComponent className={`icon rc-notification-notice-icon-${type}`} file={aiOutlineInfoCircle}/>
    }


    /* if (type == 'success') {
         return <AiOutlineCheckCircle className={`icon rc-notification-notice-icon-${type}`}/>
     } else if (type == 'warning') {
         return <AiOutlineInfoCircle className={`icon rc-notification-notice-icon-${type}`}/>
     } else if (type == 'error') {
         return <AiOutlineCloseCircle className={`icon rc-notification-notice-icon-${type}`}/>
     } else {
         return <AiOutlineInfoCircle className={`icon rc-notification-notice-icon-${type}`}/>
     }*/
}
const ContentBoxWithIcon = (props) => {
    let {message, description, type} = props;
    return (
        <>
            <div>
                <div className={'rc-notification-notice-icon'}>
                    {getIcon(type)}
                </div>
                <div className={'rc-box'}>
                    <div className={'rc-notification-notice-message'}>{message}</div>
                    {description ? <div className={'rc-notification-notice-description'}>{description}</div> : null}
                </div>
            </div>
        </>
    )
}
const CloseIcon = () => {
    return (
        <span className={'rc-notification-close-icon'}>
           <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="close" width="1em" height="1em"
                fill="currentColor" aria-hidden="true"><path
               d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
        </span>
    )
}

const duration = 3
const notification = {
    open: (props) => {
        notificationInstance.notice({
            content: <ContentBox {...props}/>,
            duration: props.duration || duration,
            closable: true,
            closeIcon: <CloseIcon/>
        });
    },
    success: (props) => {
        notificationInstance.notice({
            content: <ContentBoxWithIcon {...props} type={'success'}/>,
            duration: props.duration || duration,
            closable: true,
            closeIcon: <CloseIcon/>
        });
    },
    warning: (props) => {
        notificationInstance.notice({
            content: <ContentBoxWithIcon {...props} type={'warning'}/>,
            duration: props.duration || duration,
            closable: true,
            closeIcon: <CloseIcon/>
        });
    },
    error: (props) => {
        notificationInstance.notice({
            content: <ContentBoxWithIcon {...props} type={'error'}/>,
            duration: props.duration || duration,
            closable: true,
            closeIcon: <CloseIcon/>
        });
    },
    info: (props) => {
        notificationInstance.notice({
            content: <ContentBoxWithIcon {...props} type={'info'}/>,
            duration: 10000,
            closable: true,
            closeIcon: <CloseIcon/>
        });
    }
}

export default notification
