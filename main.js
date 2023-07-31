class GradientAnimation {
  constructor() {
    this.cnv        = document.querySelector(`#canvas`);
    this.ctx        = this.cnv.getContext(`2d`);

		this.colors = [
			{color1: "hsla(222, 91%, 42%, 1)", color2: "hsla(220, 90%, 34%, 0)"},
			{color1: "hsla(238, 100%, 6%, 1)", color2: "hsla(253, 100%, 8%, 0)"},
		]

    this.circlesNum = 16;
    this.minRadius  = 400;
    this.maxRadius  = 400;
    this.speed      = .005;
    
    (window.onresize = () => {
      this.setCanvasSize();
      this.createCircles();
    })();
    this.drawAnimation();
  }

	setSpeed(newSpeed) {
		this.speed = newSpeed;
	}

	setAmount(newAmount) {
		this.circlesNum = newAmount;
		this.createCircles();
	}

	setSize(newSize) {
		this.minRadius = newSize;
		this.maxRadius = newSize;
		this.createCircles();
	}

  setCanvasSize() {
    this.w = this.cnv.width  = innerWidth * devicePixelRatio;
    this.h = this.cnv.height = innerHeight * devicePixelRatio;
    this.ctx.scale(devicePixelRatio, devicePixelRatio)
  }

  createCircles() {
    this.circles = [];
    for (let i = 0 ; i < this.circlesNum ; ++i) {
      this.circles.push(new Circle(this.w, this.h, this.minRadius, this.maxRadius, this.colors[i % 2]));
    }
  }

  drawCircles() {
    this.circles.forEach(circle => circle.draw(this.ctx, this.speed));
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.w, this.h); 
  }

  drawAnimation() {
    this.clearCanvas();
    this.drawCircles();
    window.requestAnimationFrame(() => this.drawAnimation());
  }
}

class Circle {
  constructor(w, h, minR, maxR, circleData) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.angle  = Math.random() * Math.PI * 2;
    this.radius = Math.random() * (maxR - minR) + minR;
    this.firstColor  = circleData.color1;
    this.secondColor = circleData.color2;
  }
  draw(ctx, speed) {
    this.angle += speed;
    const x = this.x + Math.cos(this.angle) * 200;
    const y = this.y + Math.sin(this.angle) * 200;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
          gradient.addColorStop(0, this.firstColor);
          gradient.addColorStop(1, this.secondColor);

    ctx.globalCompositeOperation = `overlay`;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fill(); 
  }
}

window.onload = () => {
	const section1 = document.querySelector("#section1");
	const hideTextCheckbox = document.querySelector("#hideText");
	const speedInput = document.querySelector("#speed");
	const amountInput = document.querySelector("#amount");
	const sizeInput = document.querySelector("#size");

	hideTextCheckbox.addEventListener("change", (event) => {
		section1.classList.toggle("hide")
	});

  const mainGradient = new GradientAnimation();

	speedInput.addEventListener("input", (event) => {
		if (event.target.value && event.target.value !== 0) {
			mainGradient.setSpeed(+event.target.value)
		}
	});

	amountInput.addEventListener("input", (event) => {
		if (event.target.value && event.target.value !== 0) {
			mainGradient.setAmount(+event.target.value)
		}
	});

	sizeInput.addEventListener("input", (event) => {
		if (event.target.value && event.target.value !== 0) {
			mainGradient.setSize(+event.target.value)
		}
	});
}