import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import wordsToNumbers from 'words-to-numbers';


import NewsCards from './components/NewsCards/NewCards';
import useStyles from './styles.js';
import { act } from 'react-dom/test-utils';
// import classes from '*.module.css';

const alanKey = '04a25327e951b7ff9ad30f2835c972bc2e956eca572e1d8b807a3e2338fdd0dc/stage';
// const newsKey ='a5032cc393ef4dcca5fa25e226352d0f';

const App = () => {
    const classes = useStyles();
    const [ newsArticles, setNewsArticles ] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number}) => {
                if(command === 'newHeadLines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if(command === 'open') {
                    console.log(number);
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if(parsedNumber > 20 ) {
                        alanBtn().playText('Please try that again.')
                    } else if(article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');

                    }

                }
            }
        })
    }, [] )

    return (
        <div>
            <div className ={classes.logoContainer}>
                <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle = {activeArticle} /> 
            <h3>With a lot of help from <a href="https://www.youtube.com/channel/UCmXmlB4-HJytD7wek0Uo97A">JavaSciptMastery</a></h3>
        </div>
    )
}


export default App;