document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    //Get Form Values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    if (!validateForm(siteName, siteUrl)) {
        return false;
    }
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    // console.log(bookmark);

    // //Local Storage Test

    // localStorage .setItem('test','Hello World');
    // console.log(localStorage .getItem('test'));
    // localStorage.removeItem('test');


    //Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        //Init Array
        var bookmarks = [];
        //Add to Array
        bookmarks.push(bookmark);

        //Set to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    } else {
        //Get Bookmarks fromLocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add Bookmark To ARray
        bookmarks.push(bookmark);
        //Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //Re-fetch bookmarks
    fetchBookmarks();


    //Prevent form from Submitting
    e.preventDefault();
}
// Delete Bookmark

function deleteBookmark(url) {
    //Get Bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through Bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            //Remove From Aray
            bookmarks.splice(i, 1);
        }
    }
    // Re-set backto localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Clear Form
    document.getElementById('myForm').reset();
    //Re-fetch bookmarks
    fetchBookmarks();
}
//Fetch Bookmarks

function fetchBookmarks() {
    //Get bookmarks from LocalStoarge
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Get Output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //Build Output
    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3>' + name +
            ' <a class="btn btn-default" target="_blank" href="' + (url) + '">Visit</a> ' +
            ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
            '</h3>' +
            '</div>';
    }

}

// Validate Form
function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}