$(document).ready(() => {


    let modal = $("#scanModal");


// Get the <span> element that closes the modal
    let close = $("#modalClose");

// When the user clicks on <span> (x), close the modal
    close.click(() => {
        modal.css("display", "none")
    });

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.css("display", "none")
        }
    };


    $('#scanFoodButton').click(() => {
        // $.get(baseUrl + "/takePicture").done((response) =>{
        //     console.log(response);
        // })

        $("#flexBox").html("<video id=\"video\"></video>\n" +
            "                <canvas id=\"canvas\" class=\"canvasHidden\"></canvas>\n" +
            "                <img id=\"image\"/>\n" +
            "                <input id=\"submitButton\" type=\"button\" value=\"scan\"/>");

        let $modalContent = $("#modalContent");
        modal.css("display", "block");

        let baseUrl = window.location.origin;

        var width = "100%";
        var height = "100%";

        var streaming = false;

        let $photo = $("#image");
        let $video = $("#video");
        let $canvas = $("#canvas");
        let $startButton = $("#submitButton");

        let video = $video.get(0);
        let canvas = $canvas.get(0);
        let photo = $photo.get(0);
        let startButton = $startButton.get(0);

        video.addEventListener('canplay', function (ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                width = video.offsetWidth;
                height = video.offsetHeight;
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);

                streaming = true;
            }
        }, false);


        function stream() {
            navigator.mediaDevices.getUserMedia({video: true, audio: false})
                .then(function (stream) {
                    video.srcObject = stream;
                    video.play();
                })
                .catch(function (err) {
                    console.log("An error occurred: " + err);
                });
        }


        function clearPhoto() {
            var context = canvas.getContext('2d');
            context.fillStyle = "#AAA";
            context.fillRect(0, 0, canvas.width, canvas.height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        }

        function takeShot() {
            var context = canvas.getContext('2d');
            if (width && height) {
                canvas.width = width;
                canvas.height = height;
                context.drawImage(video, 0, 0, width, height);
                var data = canvas.toDataURL('image/png');
                photo.setAttribute('src', data);
                $photo.width(width / 2);
                $photo.height(height / 2);

                $("#flexBox").get(0).className = "flexBoxRow";
                $canvas.remove();
                $video.remove();
                $("#submitButton").remove();

                function Base64EncodeUrl(str) {
                    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
                }

                data = Base64EncodeUrl(data);

                $.ajax({
                    type: "POST",
                    url: baseUrl + '/savePicture',
                    data: data,
                    dataType: 'text',
                })
                    .then((msg) => {
                        console.log(msg);
                        $.get("/test")
                            .done((resp) => {
                                $("#flexBox").append("<div id='innerFlexBox' class='flexBoxColumn'>" +
                                    "</div>");
                            });


                        resp.forEach((element)=>{
                            $("#innerFlexBox").append("<div>"+element+"</div>");
                            });


                    });


            } else {
                clearPhoto();
            }
        }

        stream();


        $(startButton).click(() => {
            takeShot();
        });
    });

})
