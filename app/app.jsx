import React from 'react';
import {Provider} from 'react-redux';
import moment from 'moment';
import {BrowserRouter} from 'react-router-dom';
import 'assets/styles/index.scss';
import Fail from 'modules/fail';
import logErrors from 'modules/errors';
import Layout from 'containers/layout/index';
import Store from './store';
import Routes from './routes';

// sets default locale
moment.locale('ru');

export default class App extends React.Component {
    state = {fail: false, reasons: null};

    componentDidCatch(error, info) {
        this.setState({fail: true});
        logErrors(error);
        logErrors(info);
    }

    render() {
        return (
            <Provider store={Store}>
                <BrowserRouter key={Math.random()}>
                    <div>
                        {this.state.fail ? <Fail /> : <Layout><Routes /></Layout>}
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}
