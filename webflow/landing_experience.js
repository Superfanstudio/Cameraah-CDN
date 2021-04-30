var phoneContainer = $("#phoneContainer");
var phoneInnerImage = $("#phoneInnerImage");
var phoneFrame = $("#phoneFrame");
var btnStartDemo = $("#Button-Start-Demo");
var divDeviceSelector = $("#Device-Selection");

class Preview3D {
  constructor() {
    let multiplier = 1.4;
    this.devices = [
      {
        iconClass: ".iphone-icon",
        frameURL:
          "https://uploads-ssl.webflow.com/6049feb0a862ecb2aaeba05e/6071cb91a4f8de6dee978226_iphone_frame.png",
        dimens: { w: 200 * multiplier, h: 400 * multiplier, br: 50 },
      },
      {
        iconClass: ".ipad-icon",
        frameURL:
          "https://uploads-ssl.webflow.com/6049feb0a862ecb2aaeba05e/60868c44d877c1fcbed4704b_iPad.png",
        dimens: { w: 593 * multiplier, h: 426 * multiplier, br: 15 },
      },
    ];
    this.isDraggingPhone = false;
  }

  init() {
    this.addEvents();
    var _self = this;
    Webflow.resize.on(function () {
      _self.adjustInnerImageDimens();
      _self.placeShowDemoButton();
    });
    this.saveInitialPhonePosition();
    this.movePhone();
    this.placeShowDemoButton();
    this.setupDeviceSelectors();
    phoneContainer.show();

  }

  saveInitialPhonePosition() {
    let pC = phoneContainer;
    let windowWidth = $(window).width();
    let windowHeight = $(window).height();
    let phoneWidth = pC.width();
    let phoneHeight = pC.height();

    this.lastPhonePosition = {
      x: (windowWidth - phoneWidth) / 2,
      y: windowHeight - phoneHeight - 50,
    };
  }

  movePhone(newX, newY, animate = false) {
    let pC = phoneContainer;
    let pII = phoneInnerImage;
    let pCClass = "." + pC.attr("class");
    let pIIClass = "." + pII.attr("class");

    let { x, y } = this.lastPhonePosition;

    if (!newX || !newY) this.saveInitialPhonePosition();

    newX = newX || this.lastPhonePosition.x;
    newY = newY || this.lastPhonePosition.y;

    let windowWidth = $(window).width();
    let windowHeight = $(window).height();
    let phoneWidth = pC.width();
    let phoneHeight = pC.height();

    newX = this.snapTo(newX, 0, windowWidth - phoneWidth);
    newY = this.snapTo(newY, 0, windowHeight - phoneHeight);

    // move phone
    if (animate) {
      gsap.fromTo(
        pCClass,
        { x, y },
        {
          x: newX,
          y: newY,
          duration: 0.3,
        }
      );
    } else {
      pC.css({
        transform: `translate(${newX}px, ${newY}px)`,
      });
    }
    // adjust phone inner image bg position
    let bgX = newX + this.bgPositionOffset;
    let bgY = newY;
    let newBgPosition = {
      backgroundPosition: `-${bgX}px -${bgY}px`,
      duration: 0.3,
    };
    if (animate) {
      gsap.to(pIIClass, newBgPosition);
    } else {
      pII.css(newBgPosition);
    }

    this.lastPhonePosition.x = newX;
    this.lastPhonePosition.y = newY;
  }

  placeShowDemoButton() {
    let btn = btnStartDemo;
    let btnWidth = btn.width();
    let btnHeight = btn.height();

    let pC = phoneContainer;
    let pCPosition = this.lastPhonePosition;
    let pCX = pCPosition.x;
    let pCY = pCPosition.y;
    let pCWidth = pC.width();
    let pCHeight = pC.height();

    let btnX = pCX + pCWidth / 2 - btnWidth / 2;
    let btnY = pCY - btnHeight - 100;
    btn.css({
      left: btnX,
      top: btnY,
    });
    btn.show();
  }

  setupDeviceSelectors() {
    let divDevices = divDeviceSelector;
    let devices = this.devices;

    devices.forEach((device) => {
      let { iconClass } = device;
      let deviceIcon = divDevices.find(iconClass);
      if (deviceIcon.length == 0) return;

      let data_str = encodeURIComponent(JSON.stringify(device));
      deviceIcon.attr("data-device", data_str);

      deviceIcon.on("click", this.updateActiveDevice.bind(this));
    });
  }

  updateActiveDevice(e) {
    let data_str = $(e.target).attr("data-device");
    let device = JSON.parse(decodeURIComponent(data_str));
    let pC = phoneContainer;
    let pF = phoneFrame;
    let pII = phoneInnerImage;
    let { dimens, frameURL } = device;

    pF.css({
      "background-image": `url(${frameURL})`,
      "border-radius": `${dimens.br}px`,
    });
    pC.css({
      height: dimens.h,
      width: dimens.w,
      "border-radius": `${dimens.br}px`,
    });
    pII.css({
      "border-radius": `${dimens.br}px`,
    });
    this.movePhone(undefined, undefined, false);
  }

  addEvents() {
    let pC = phoneContainer;
    let btn = btnStartDemo;

    btn.on("click", (e) => {
      this.enterPreviewMode({ x: e.pageX, y: e.pageY });
    });

    pC.on("click", (e) => {
      if (this.isDraggingPhone) {
        this.exitPreviewMode();
      }
    });
  }

  enterPreviewMode(startPos) {
    let pC = phoneContainer;
    let btn = btnStartDemo;
    let devices = divDeviceSelector;

    this.isDraggingPhone = true;
    this.mouseOffset = {
      x: pC.width() / 2,
      y: pC.height() / 2,
    };
    $(".nav-copy, .nav-shadow").fadeOut(300);
    btn.fadeOut(300);
    devices.fadeOut(300);
    $("#main-heading").fadeOut(300);

    if (startPos) {
      this.movePhone(
        startPos.x - pC.width() / 2,
        startPos.y - pC.height() / 2,
        true
      );
    }
    this.moveHandler = this.mouseMoveHandler.bind(this);
    $(document).bind("mousemove", this.moveHandler);
  }

  exitPreviewMode() {
    let btn = btnStartDemo;
    let devices = divDeviceSelector;

    this.isDraggingPhone = false;
    $(".nav-copy, .nav-shadow").fadeIn(300);
    btn.fadeIn(300);
    devices.fadeIn(300);
    $("#main-heading").fadeIn(300);

    this.movePhone(undefined, undefined, true);
    $(document).unbind("mousemove", this.moveHandler);
    this.mouseOffset = undefined;
  }

  adjustInnerImageDimens() {
    this.actualImage = new Image();
    this.actualImage.src = phoneInnerImage
      .css("background-image")
      .replace(/"/g, "")
      .replace(/url\(|\)$/gi, "");
    $(this.actualImage).bind("load", this.innerImageLoadHandler.bind(this));
  }

  innerImageLoadHandler() {
    let bgWidth = this.actualImage.width;
    let bgHeight = this.actualImage.height;
    let windowHeight = $(window).height();
    let windowWidth = $(window).width();
    let scaleFactor = windowHeight / bgHeight;

    let newBgWidth = bgWidth * scaleFactor;
    let newBgHeight = bgHeight * scaleFactor;
    let excessBgWidth = newBgWidth - windowWidth;
    let bgPositionOffset = excessBgWidth / 2;
    this.bgPositionOffset = bgPositionOffset;
    phoneInnerImage.css({
      backgroundSize: `${newBgWidth}px ${newBgHeight}px`,
    });
    this.movePhone();
  }

  mouseMoveHandler(event) {
    let offset = this.mouseOffset;
    if (!offset) return;
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let newX = mouseX - offset.x;
    let newY = mouseY - offset.y + $(window).scrollTop();
    this.movePhone(newX, newY);
  }

  snapTo(value, lower, upper) {
    if (value <= lower) return lower;
    if (value >= upper) return upper;
    return value;
  }
}

function initPhonePreviewer() {
  var previewer = new Preview3D();
  previewer.init();
}

function setFullHeight() {
  var fulls = $(".full-page");
  var win = $(window);
  Webflow.resize.on(function () {
    fulls.height(win.height());
  });
}

try {
  Webflow.push(setFullHeight);
  Webflow.push(initPhonePreviewer);
} catch (e) {
  console.log("error in end-of-body scripts");
}
