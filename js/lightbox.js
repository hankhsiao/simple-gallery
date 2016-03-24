/**
 * The lightbox for image
 * @class Lightbox
 * @constructor
 * @param {String} id - The id selector
 */
function Lightbox (id) {
    // Bind and create DOM node
    this.node = document.querySelector(id);
    this.node.setAttribute('tabindex', '0');
    this.node.innerHTML = '<div class="container"><div class="content"></div></div>' +
        '<button class="prev"></button>' +
        '<button class="next"></button>';
    this.content = this.node.querySelector('.content');
    this.prev = this.node.querySelector('.prev');
    this.next = this.node.querySelector('.next');

    // Initialize states
    this.images = [];
    this.currIndex = 0;
    this.isOpened = false;

    this.init();
}

Lightbox.prototype = {
    init: function () {
        // Initialize styles
        this.node.style.position = 'fixed';
        this.node.style.top = 0;
        this.node.style.bottom = 0;
        this.node.style.left = 0;
        this.node.style.right = 0;
        this.node.style.zIndex = 10;

        // Bind events
        this.node.addEventListener('click', this.handleClick.bind(this), false);
        this.node.addEventListener('keydown', this.handleKeydown.bind(this), false);

        this.render();
    },

    handleKeydown: function (e) {
        var code = e.keyCode; // code for chrome and key for IE
        if (this.node.contains(e.target)) {
            if (code === 39) {
                this.goNext();
            } else if (code === 37) {
                this.goPrev();
            } else if (code === 27) {
                this.close();
            }
        }
    },

    handleClick: function (e) {
        var target = e.target;
        var index;

        while (target) {
            if (target === e.currentTarget) {
                this.close();
                break;
            }

            if (target.tagName === 'IMG') {
                this.goNext();
                break;
            }

            if (containsClass(target, 'prev')) {
                this.goPrev();
                break;
            } else if (containsClass(target, 'next')) {
                this.goNext();
                break;
            }

            target = target.parentElement;
        }
    },

    goNext: function () {
        if (this.currIndex + 1 >= this.images.length) {
            return;
        }
        this.currIndex++;
        this.render();
    },

    goPrev: function () {
        if (this.currIndex - 1 < 0) {
            return;
        }
        this.currIndex--;
        this.render();
    },

    open: function (images, index) {
        this.images = images || [];
        this.currIndex = index || 0;
        this.isOpened = true;
        this.render();
    },

    close: function () {
        this.isOpened = false;
        this.render();
    },

    render: function () {
        var index = this.currIndex;
        var total = this.images.length;
        var img = this.images[index];

        if (!img) {
            return;
        }

        if (!this.isOpened) {
            this.node.style.display = 'none';
            return;
        }
        this.node.style.display = 'block';
        this.node.focus();

        this.content.innerHTML = '<img src="' + img.media.z + '" alt="' + img.title + '"/>' +
            '<div class="indicator">' + (index + 1) + '/' + total + '</div>';

        if (this.currIndex === 0) {
            this.prev.style.display = 'none';
            this.next.style.display = '';
        } else if (this.currIndex === this.images.length - 1) {
            this.next.style.display = 'none';
            this.prev.style.display = '';
        } else {
            this.next.style.display = '';
            this.prev.style.display = '';
        }
    }
};
