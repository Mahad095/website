class Animator {
    constructor(fps = 60, animate) {
      this.requestID = 0;
      this.fps = fps;
      console.log(this.fps);
      this.animate = animate;
      this.playing = false;
    }
  
    start() {
      if(!this.playing)
      {
        this.playing = true;
        let then = performance.now();
        const interval = 1000 / this.fps;
        const tolerance = 0.1;
  
        const animateLoop = (now) => {
          this.requestID = requestAnimationFrame(animateLoop);
          const delta = now - then;
  
          if (delta >= interval - tolerance) {
            then = now - (delta % interval);
            this.animate(delta);
          }
        };
        this.requestID = requestAnimationFrame(animateLoop);
      }
    }
  
    stop() {
      if(this.playing)
      {
        this.playing = false;
        cancelAnimationFrame(this.requestID);
      }
    }
  
  }
  export default Animator;