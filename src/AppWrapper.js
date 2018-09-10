import React from 'react';
import { withRouter } from 'react-router-dom';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { loadFonts } from './helper/fonts';

class AppWrapper extends React.Component {
    componentDidUpdate(prevProps) {
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        // Load preloaded stylesheets.
        const styles = document.querySelectorAll('link[rel=preload][as=style]');
        Array.prototype.forEach.call(styles, style => Object.assign(style, { rel: 'stylesheet' }));

        // loadFonts();
    }

    render() {
        const { helmetContext } = this.props;
        return (
            <HelmetProvider context={helmetContext}>
                <App />
            </HelmetProvider>
        );
    }
}

export default withRouter(AppWrapper)
