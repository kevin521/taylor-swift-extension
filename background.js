
/**
 * Global variable containing the query we'd like to pass to Flickr. 
 *
 * @type {string}
 */
var QUERY = 'taylor swift';


/**
 * Checks to see if an object is contained in the array
 *
 * @public
 */
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

var photoGenerator = {
  /**
   * Flickr URL that will give us lots and lots of whatever we're looking for.
   *
   * See http://www.flickr.com/services/api/flickr.photos.search.html for
   * details about the construction of this URL.
   *
   * <<API_KEY>>
   * @type {string}
   * @private
   */
  searchOnFlickr_: 'https://secure.flickr.com/services/rest/?' +
      'method=flickr.photos.search&' +
      'api_key=<<API_KEY>>&' +
      'text=' + encodeURIComponent(QUERY) + '&' +
      'is_common=1&' +
      'content_type=1&' +
      'sort=interestingness-desc&media=all&license=4&' +
      'per_page=40',

  /**
   * Sends an XHR GET request to grab photos. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestPhotos: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnFlickr_, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },


  getTime: function() {
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (minutes < 10){
    minutes = "0" + minutes
    }
    if(hours > 12){
      document.getElementById("content").innerHTML = (hours-12 + ":" + minutes)
    } else {
      document.getElementById("content").innerHTML = (hours + ":" + minutes)
    }
  },

  /**
   * Handle the 'onload' event of our photo XHR request, generated in
   * 'requestPhotos', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showPhotos_: function (e) {
    var photos = e.target.responseXML.querySelectorAll('photo');
    var index = Math.round(Math.random() * photos.length)-1;
    console.log(index)
    var badIndices = [0,1,2,4,10,11,16,21,32,34,35]

    while(contains(badIndices,index))
      index = Math.round(Math.random() * photos.length)-1;

    var img = document.createElement('img');
    img.src = this.constructPhotoURL_(photos[index]);
    img.setAttribute('alt', photos[index].getAttribute('title'));

    this.getTime()

    document.body.style.background = "url('"+ img.src + "') ";
    document.body.style.backgroundSize = "cover"
  },

  /**
   * Given a photo, construct a URL using the method outlined at
   * http://www.flickr.com/services/api/misc.urlPhotol
   *
   * @param {DOMElement} A photo.
   * @return {string} The photo's URL.
   * @private
   */
  constructPhotoURL_: function (photo) {
    // Need to have it check first to see what sizes are available
    return "http://farm" + photo.getAttribute("farm") +
        ".static.flickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_b.jpg";
  }
};

// Run our photo generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  photoGenerator.requestPhotos();
});
