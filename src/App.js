import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';


import NewsCards from './components/NewsCards/NewCards';
import useStyles from './styles.js';
// import classes from '*.module.css';

const alanKey = '04a25327e951b7ff9ad30f2835c972bc2e956eca572e1d8b807a3e2338fdd0dc/stage';
// const newsKey ='a5032cc393ef4dcca5fa25e226352d0f';

const App = () => {
    const classes = useStyles();
    const [ newsArticles, setNewsArticles ] = useState([]);
    
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles}) => {
                if(command === 'newHeadLines') {
                    setNewsArticles(articles);
                }
            }
        })
    }, [] )

    return (
        <div>
            <div className ={classes.logoContainer}>
                <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" />
            </div>
            <NewsCards articles={newsArticles} /> 
        </div>
    )
}


export default App;