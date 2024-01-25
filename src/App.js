import React from "react"
import "./App.css";
import Routes from "./routes/route";
import {connect} from 'react-redux'
import {hideLoader} from "./actions/loader";
import {Socket, SocketComponent} from './socket'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(hideLoader())
    }

    render() {
        let {isLoading} = this.props;
        return (
            <div className="App">
                {isLoading ? <div className={'loader_outer_view'}>
                    <div className={'loader_inner'}>
                        <img src={'../assets/logos/thrones_logo.png'}/>
                    </div>
                </div> : null}

                <Routes {...this.props}/>

                <div id={'confirm-dialog'}></div>
                <SocketComponent/>
            </div>
        );
    }
}

const mapStateToProps = ({global, router}) => ({
    isLoading: global.isLoading,
    currentUser: global.currentUser,
})
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)

