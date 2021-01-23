import React, { Component } from 'react'
import Error from './Error';

//klasa do wyłapywania błędów w UI (błędy przy renderowaniu, w cyklach życia, konstruktorach etc) => pokaż fallback UI (komponent <Error />)
class ErrorBoundry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        }
    }

    componentDidCatch(error, errorInfo){
        this.setState({error, errorInfo});
    }

    render() {
        if (this.state.errorInfo)return <Error error={this.state.errorInfo}/>
        return this.props.children;
    }
}

export default ErrorBoundry;
