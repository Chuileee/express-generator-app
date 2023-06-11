let images = [];
let currentIndex = 0;
let timeout;

$(document).ready(function () {
    updateImageList();

    $('.previous').click(function () {
        clearTimeout(timeout);
        showPreviousImage();
    });

    $('.next').click(function () {
        clearTimeout(timeout);
        showNextImage();
    });

    $('.update').click(function () {
        clearTimeout(timeout);
        updateImageList();
    });
});

function updateImageList() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            images = JSON.parse(xhr.responseText);
            currentIndex = 0;
            showImage();

            // Generate thumbnail images
            generateThumbnails();
        }
    };
    xhr.open('GET', 'images.txt', true);
    xhr.send();
}

/* function updateImageList() {
    fetch('images.txt')
        .then(response => response.json())
        .then(data => {
            images = data;
            currentIndex = 0;
            showImage();
            generateThumbnails();
        })
        .catch(error => {
            console.error('Error fetching image list:', error);
        });
} */


function generateThumbnails() {
    const thumbnailsContainer = $('.thumbnails');
    thumbnailsContainer.empty();

    images.forEach((image, index) => {
        const thumbnail = $('<img>')
            .addClass('thumbnail')
            .attr('src', image.filename)
            .attr('alt', `Thumbnail ${index + 1}`)
            .click(function () {
                clearTimeout(timeout);
                currentIndex = index;
                showImage();
            });

        thumbnailsContainer.append(thumbnail);
    });
}

function showImage() {
    const currentImage = images[currentIndex];
    $('.image-display').fadeOut(function () {
        $(this).attr('src', currentImage.filename).fadeIn();
    });

    $('.image-display').siblings('figcaption').remove();
    const caption = $('<figcaption>').text(currentImage.caption);
    $('.image-display').after(caption);

    $('.thumbnail').each(function (index) {
        if (images[index]) {
            $(this).attr('src', images[index].filename);
        } else {
            $(this).attr('src', '').css('visibility', 'hidden');
        }
    });

    timeout = setTimeout(showNextImage, currentImage.duration);
}

// Add click event listener to thumbnails
$('.thumbnail').click(function () {
    clearTimeout(timeout);
    currentIndex = $('.thumbnail').index(this);
    showImage();
});

function showPreviousImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    showImage();
}

function showNextImage() {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    showImage();
}
