$(document).ready(() => {

    $('.noteDiv').hide();
    $('.clearAll').on('click', event => $('.card-article').empty());

    $('.scrape-new').on('click', event => $.get('/scrape/')
        .then(window.location.href = window.location.href)
        .catch(err => {
            console.log(err);
            // res.sendStatus(404)
            alert('Error 404')
        })
    );


    $(document).on('click', '#add-note-btn', function () {

        // Save the id from the  tag
        let thisId = $(this).attr("data-id");
        let url = "/articles/" + thisId;

        // const selector = `div.noteDiv[data-id=${thisId}]"`;
        // $(selector).show();
        // const btn = $(this);
        // const parentElementCard = btn.parents(".card-article");
        // parentElementCard.find(".noteDiv").show();

        let target = '[data-id=' + thisId + ']';
        $(`.noteDiv${target}`).show();

        $.get(url)
            // With that done, add the note information to the page
            .then(data => {
                console.log(data);

                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $(".titleinput2").text(data.note.title);
                    // Place the body of the note in the body textarea
                    $(".bodyinput2").text(data.note.body);
                };
            });
    });

    // $('#save-note-btn').on('click', event => saveNote());
    // function saveNote() {
    // $('#save-note').on('click', function () {
    $(document).on("click", "#save-note-btn", function () {

        let thisId = $(this).attr('data-id');
        console.log(thisId);

        let titleInput = $("#titleinput").val().trim();
        let bodyInput = $("#bodyinput").val().trim();

        let noteData = {
            title: titleInput,
            body: bodyInput
        }
        console.log(noteData);

        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: noteData
        }).then(function (response) {
            console.log('hit .then() ')
            console.log(response)
            $('.notes').empty();
        }).catch(function (err) {
            console.log(err);
            alert('Error status 404');
        });

        // let url = '/articles/' + thisId;
        // $.post(url)
        // .then(data => console.log(data))
        // .catch(err => {
        //     console.log(err);
        //     data.sendStatus(404);
        // })
    });


});