import React, {useEffect} from 'react'
import {apiUrl} from './setting'
import {connect} from 'react-redux'
import {useDispatch} from 'react-redux'
import {getUserToken, getUserData} from './request'
import IO from 'socket.io-client'

let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
let token = localStorage.getItem('token') ? localStorage.getItem('token') : null

let Socket = IO(apiUrl, {
    secure: false,
    transports: ['websocket'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000
})

if (!Socket.connected) {
    console.log('connct attempted')
    Socket.connect()
}

Socket.on('connect', async () => {
    console.log('conneciton succssful')
    reAuthenticate()
})

Socket.on('disconnect', function () {
    if (user && user._id) {
        Socket.emit('discountUser', user._id)
    }
})

Socket.on('authenticated', () => {
})

Socket.on('unauthorized', () => {
})

Socket.on('connect_error', err => {
    //  socket.disconnect()
    console.log('on disconecced socket', err)
})

Socket.on('connect_failed', err => {
})

Socket.on('got_back', () => {
})


const reAuthenticate = async () => {
    let userToken = await getUserToken()
    let currentUser = await getUserData()
    if (userToken && Socket.connected && currentUser && currentUser._id) {
        Socket.emit('authenticate', {userToken, userId: currentUser._id})
    }
}


const SocketComponentMain = (props) => {
    const dispatch = useDispatch()


    useEffect(() => {
        console.log('run')
        Socket.on('reload dashboard', (data) => {
            dispatch({
                type: 'RELOAD_DASHBOARD',
                value: true,
                userId: data.userId
            })
        })


        Socket.on('refresh kot', (data) => {
            dispatch({
                type: 'REFRESH_KOT',
                isRefreshKot: true,
                kotData: data
            })
        })


    }, [])

    return (
        null
    )

}


const mapStateToProps = ({counter, global}) => ({
    reloadDashboard: global.reloadDashboard,
    currentUser: global.currentUser
})
const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}
const SocketComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(SocketComponentMain)

export {SocketComponent, Socket}


