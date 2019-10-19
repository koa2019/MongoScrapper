$(document).ready( () => {

    getArticles();
    
    $('.scrape-new').on('click', event => {

        $.get('/scrape/', data => {
            console.log(data);
            getArticles()
        });
    });

    function getArticles(){
        $.get('/articles', allArticles => {
            console.log(allArticles);
            // .then( window.location.href = window.location.href);
            window.location.href = window.location.href;
        });
    }
});