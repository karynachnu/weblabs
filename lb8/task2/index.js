class Slider {
    constructor(config) {
      this.config = Object.assign({
        images: [],
        duration: 500,
        autoplay: true,
        showArrows: true,
        showDots: true,
        interval: 3000
      }, config);
  
      this.current = 0;
      this.track = document.querySelector('.slider-track');
      this.dotsContainer = document.getElementById('dots');
      this.slider = document.getElementById('slider');
      this.init();
    }
  
    init() {
      this.renderSlides();
      if (this.config.showDots) this.renderDots();
      if (!this.config.showArrows) {
        document.querySelectorAll('.arrow').forEach(btn => btn.style.display = 'none');
      }
  
      document.querySelector('.left').addEventListener('click', () => this.prev());
      document.querySelector('.right').addEventListener('click', () => this.next());
      document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
      });
  
      if (this.config.autoplay) this.setAutoplay();
  
      this.slider.addEventListener('mouseenter', () => clearInterval(this.auto));
      this.slider.addEventListener('mouseleave', () => this.setAutoplay());
    }
  
    renderSlides() {
      this.track.innerHTML = '';
      this.track.style.transitionDuration = this.config.duration + 'ms';
      this.config.images.forEach(content => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = content;
        this.track.appendChild(slide);
      });
      this.update();
    }
  
    renderDots() {
      this.dotsContainer.innerHTML = '';
      this.config.images.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (i === this.current) dot.classList.add('active');
        dot.addEventListener('click', () => this.goTo(i));
        this.dotsContainer.appendChild(dot);
      });
    }
  
    update() {
      this.track.style.transform = `translateX(-${this.current * 100}%)`;
      if (this.config.showDots) {
        [...this.dotsContainer.children].forEach((dot, i) =>
          dot.classList.toggle('active', i === this.current)
        );
      }
    }
  
    prev() {
      this.current = (this.current - 1 + this.config.images.length) % this.config.images.length;
      this.update();
    }
  
    next() {
      this.current = (this.current + 1) % this.config.images.length;
      this.update();
    }
  
    goTo(index) {
      this.current = index;
      this.update();
    }
  
    setAutoplay() {
      if (this.config.autoplay) {
        this.auto = setInterval(() => this.next(), this.config.interval);
      }
    }
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    new Slider({
      images: [
        '<img src="source/image1.jpg" alt="Image 1">',
        '<video controls><source src="source/video1.mp4" type="video/mp4"></video>',
        '<div><h2>Гори</h2></div>',
        '<img src="source/image2.jpg" alt="Image 2">',
        '<video controls><source src="source/video2.mp4" type="video/mp4"></video>',
        '<img src="source/image3.jpg" alt="Image 3">'
      ]
    });
  });
  