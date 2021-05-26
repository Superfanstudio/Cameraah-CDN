var DEVICE_TYPE;

function detectDevice() {
    let matches = navigator.userAgent.toLocaleLowerCase().match(/android|ios|ipad|ipad/i);
    if(matches) 
        DEVICE_TYPE = matches[0];
    else {
        DEVICE_TYPE = "others";
    }
}
detectDevice();

var link = document.createElement("a");
document.body.appendChild(link);
link.rel = "ar";

function addSeeARButtonEvents() {
    let models = {
        mug: {
            qrSelector: "see-ar-qr1",
            ios: "https://superfandotai.s3.amazonaws.com/WebAR/custom344.usdz",
            android: "https://cameraah.s3.amazonaws.com/prod/60ae4f0f92ec7b5564a99771/assets/gltf/custom980.9142878765631.gltf",
            url: "https://link.cameraah.com/sRlO4",
        },
        lamp: {
            qrSelector: "see-ar-qr2",
            ios: "https://superfandotai.s3.amazonaws.com/WebAR/custom981.usdz",
            android: "https://cameraah.s3.amazonaws.com/prod/60ae4f0f92ec7b5564a99771/assets/gltf/custom669.9454158333755.gltf",
            url: "https://link.cameraah.com/XigYRt",
        },
        sofa: {
            qrSelector: "see-ar-qr3",
            ios: "https://superfandotai.s3.amazonaws.com/WebAR/custom930.usdz",
            android: "https://cameraah.s3.amazonaws.com/prod/60ae4f0f92ec7b5564a99771/assets/gltf/custom960.7421683875115.gltf",
            url: "https://link.cameraah.com/GtjTTG",
        },
        tiles: {
            qrSelector: "see-ar-qr4",
            ios: "https://superfandotai.s3.amazonaws.com/WebAR/custom319.usdz",
            android: "https://cameraah.s3.amazonaws.com/prod/60ae4f0f92ec7b5564a99771/assets/gltf/custom806.446536695252.gltf",
            url: "https://link.cameraah.com/2WNT",
        },
    }

    // On click of `See in AR` buttons
    $(".see-ar").on("click", e => {
        let modelName = $(e.target).data("model");
        if (!modelName) return;
        let model = models[modelName];
        if(DEVICE_TYPE === "android") { // android
            gotToDeviceLink(model.android, true);
        } else if(["ios","ipad","ipod"].includes(DEVICE_TYPE)) { // ios
            gotToDeviceLink(model.ios);
        } else { // web and others
            $(`#${model.qrSelector}`).show();
            $("#see-ar-modal").css("display","flex");
        }
    })

    $(".see-ar p").on("click", e => $(e.target).parent().click());

    // Modal close button
    $("#see-ar-modal-close").on("click", _ => {
        $("#see-ar-modal .qr").hide();
        $("#see-ar-modal").hide();
    })
}

function gotToDeviceLink(href, isAndroid = false) {
    if(isAndroid) {
        href = `intent://arvr.google.com/scene-viewer/1.0?file=${href}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`
    }
    link.href = href;
    link.click();
}

try {
    Webflow.push(addSeeARButtonEvents);
  } catch (e) {
    console.log("error in see-ar script");
  }