$(document).ready(() => {

    $('.scrape-new').on('click', event => $.get('/scrape/')
        .then(window.location.href = window.location.href)
        .catch(err => {
            console.log(err);
            res.sendStatus(404)
        })
    );

    $('.clearAll').on('click', event => {
        let targetElement = '.card-article';
        empty(targetElement);
    });
    // $('#save-note-btn').on('click', event => saveNote());

    $(document).on('click', '#add-note', function () {
        
        // Empty the notes from the note section
        empty('#notes');

        // Save the id from the p tag
        let thisId = $(this).attr("data-id");
        let url = "/articles/" + thisId;

        $.get(url)
            // With that done, add the note information to the page
            .then(data => {
                // console.log(data);
                // The title of the article
                $("#notes").append("<h4>" + data.headline + "</h4>");
                // An input to enter a new title
                $("#notes").append("<input id='titleinput' name='title' placeholder='Note Title' />");
                // A textarea to add a new note body
                $("#notes").append("<textarea id='bodyinput' name='body' placeholder='Notes'></textarea> ");
                // A button to submit a new note, with the id of the article saved to it
                $("#notes").append("<button type='button' data-id='" + data._id + "' id='save-note'>Save Note</button>");

                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $("#titleinput").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $("#bodyinput").val(data.note.body);
                };
            });
    });

    // function saveNote() {
    // $('#save-note').on('click', function () {
    $(document).on("click", "#save-note", function () {

        let thisId = $(this).attr('data-id');
        console.log(thisId);

        let titleInput = $("#titleinput").val().trim();
        let bodyInput =  $("#bodyinput").val().trim();

        let noteData = {
            title: titleInput,
            body: bodyInput
        }
        console.log(noteData)

        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: noteData
        }).then(results => {
            console.log(results)
            // let targetId = '#notes';
            // empty('#notes');
        }).catch(err => console.log(err));

        // let url = '/articles/' + thisId;
        // $.post(url)
        // .then(data => console.log(data))
        // .catch(err => {
        //     console.log(err);
        //     data.sendStatus(404);
        // })
    });


    function empty(stringId) {
        console.log(stringId)
        $(stringId).empty();
    }

});