var url = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=italy&format=json';
var lightbox = new Lightbox('#lightbox');
var grid = new Grid('#grid', lightbox);
grid.loadImages(url);
