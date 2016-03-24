/**
 * The Grid list for image gallery
 * @class Grid
 * @constructor
 */
function Grid (id, lightbox) {
    this.node = document.querySelector(id);
    this.images = [];
    this.lightbox = lightbox;

    this.init();
}

Grid.prototype = {
    init: function () {
        this.node.addEventListener('click', this.handleClick.bind(this), false);
        this.render();
    },

    handleClick: function (e) {
        var target = e.target;
        var index;

        while (target) {
            if (target === e.currentTarget) {
                break;
            }
            if (containsClass(target, 'image-item')) {
                index = parseInt(target.getAttribute('data-index'));
                this.lightbox.open(this.images, index);
                break;
            }
            target = target.parentElement;
        }
    },

    getLargeImages: function () {
        for (var i = 0, l = this.images.length; i < l; i++) {
            var img = this.images[i];
            img.media.z = img.media.m.replace('_m', '_z');
        }
    },

    loadImages: function (url) {
        var self = this;
        jsonp(url, function cb (data) {
            self.images = (data && data.items) || [];
            self.getLargeImages()
            self.render();
        });
    },

    renderImage: function (img, index) {
        return '<div data-index="' + index + '" class="image-item" style="background-image: url(' + img.media.m + ')">' +
            '<div class="image-title"><span class="line-clamp-1">' + img.title + '<span></div>' +
        '</div>';
    },

    render: function () {
        var self = this;
        var images = this.images;

        if (!images || images.length === 0) {
            return;
        }

        this.node.innerHTML = '<ul>' + images.map(function eachItem (img, index) {
            return '<li class="image-cell">' + self.renderImage(img, index) + '</li>';
        }).join('') + '</ul>';
    }
};
