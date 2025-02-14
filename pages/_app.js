// 'pages/_app.js' is a higher-order component that wraps around all other components in the app.
// It's useful for setting up global styles, error boundaries, data fetching, etc.
// `pages/_app.js`:: css can only be imported in this file, not in other files.
import '../styles/global.css';



export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}