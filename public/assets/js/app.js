$(document).ready(() => {

    $('.noteDiv').hide();
    $('.clearAll').on('click', event => $('.card-article').empty());

    $('.scrape-new').on('click', event => $.get('/scrape/')
        .then(res => window.location.href = window.location.href)
        .catch(err => {
            console.log(err);
            res.sendStatus(404)
            // alert('Error 404')
        })
    );

    // Event Listener for article button
    $(document).on('click', '#add-note-btn', function () {

        // Save the id from the button tag
        let thisId = $(this).attr("data-article-id");
        let url = "/articles/" + thisId;

        // alt way #1 finding nested child element
        // const btn = $(this);
        // const parentElementCard = btn.parents(".card-article");
        // parentElementCard.find(".noteDiv").show()
        // alt way #2
        // const selector = '[data-noteDiv-id=' + thisId + ']';
        // $(`.noteDiv${selector}`).show();
        const selector1 = ".noteDiv[data-noteDiv-id=" + thisId + "]";
        $(selector1).show();

        // ajax GET method to single Article by id & any Notes associated with id
        $.get(url)
            // With that done, add the note information to the page
            .then(data => {
                console.log(data);

                // If there's a note in the article
                if (data.note) {
                    // Place the body of the note in the div with this class
                    $(".bodyoutput").text(data.note.body);
                };
            }).catch(err => console.data(err));
    });

    // $('#save-note').on('click', function () {
    $(document).on("click", "#save-note-btn", function (event) {

        // Stop form from submitting normally
        event.preventDefault();

        const thisId = $(this).attr('data-save-id');
        console.log(thisId);

        let bodyInput = $('#bodyinput').val().trim();
        console.log(bodyInput);

        const selector2 = ".noteDiv[data-noteDiv-id=" + thisId + "]";
        // $(selector2).hide();

        let noteData = {
            body: bodyInput
        };
        console.log(noteData);

        let url = '/articles/' + thisId;
        $.post(url, noteData)
            .then(data => {
                console.log(data);
                // If there's a note in the article
                if (data.note) {
                    // Place the body of the note in the div with this class
                    $(".bodyoutput").text(data.note.body);
                };
                // $(".bodyoutput").text(response.note);
            }).catch(err => {
                console.log(err);
                console.log('Note.body can not be empty');
                $(".bodyoutput").text('Note Not Saved. Note Can Not Be Empty.');
            });

        // reset textarea to empty string
        $("#bodyinput").val("");
        // bodyInput.val('');
        // $("#bodyinput").empty();
    });

    // EventListener for note close button
    $(document).on("click", "#close-note-btn", function (event) {

        // Stop form from submitting normally
        event.preventDefault();

        const thisId = $(this).attr('data-close-id');
        console.log(thisId);
        const selector3 = ".noteDiv[data-noteDiv-id=" + thisId + "]";
        $(selector3).hide();
        // const targetDiv = '[data-noteDiv-id=' + thisId + ']';
        // console.log(targetDiv);
        // $(`.noteDiv${targetDiv}`).hide();
    });
});