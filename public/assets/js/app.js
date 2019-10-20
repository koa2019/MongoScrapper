$(document).ready(() => {

    $('.scrape-new').on('click', event => $.get('/scrape/')
        .then(window.location.href = window.location.href)
        .catch(err => res.sendStatus(404)));

    $('.clearAll').on('click', event => empty());

    $(document).on('click', '.card-article', function () {
        // Empty the notes from the note section
        $("#notes").empty();
        // Save the id from the p tag
        var thisId = $(this).attr("data-id");

        // Now make an ajax call for the Article
        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
            // With that done, add the note information to the page
            .then(function (data) {
                console.log(data);
                // The title of the article
                $("#notes").append("<h4>" + data.headline + "</h4>");
                // An input to enter a new title
                $("#notes").append("<input id='titleinput' name='title' placeholder='Note Title' />");
                // A textarea to add a new note body
                $("#notes").append("<textarea id='bodyinput' name='body' placeholder='Notes'></textarea> ");
                // A button to submit a new note, with the id of the article saved to it
                $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $("#titleinput").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $("#bodyinput").val(data.note.body);
                }
            });
    });
    // $(document).on('click', '.save-article', function() {
    //     let thisId = $(this).data('saveArticle-id');
    //     console.log(thisId);
    // });

    function empty() {
        $('.articles').empty();
    }

});