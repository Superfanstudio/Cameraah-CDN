var DEVICE_TYPE = navigator.userAgent.toLocaleLowerCase().match(/android|ios|ipad|ipad/i)[0];
var link = document.createElement("a");
document.body.appendChild(link);
link.rel = "ar";

function addSeeARButtonEvents() {
    let models = {
        mug: {
            qrSelector: "see-ar-qr1",
            ios: "https://superfandotai.s3.amazonaws.com/WebAR/custom422.usdz",
            android: "https://cameraah.s3.amazonaws.com/exportedmodels/gltf/custom715.4121184481734.gltf",
            url: "https://link.cameraah.com/8bKX",
        },
        lamp: {
            qrSelector: "see-ar-qr2",
            ios: "https://superfandotai.s3.amazonaws.com/WebAR/custom823.usdz",
            android: "https://cameraah.s3.amazonaws.com/exportedmodels/gltf/custom73.28520438789421.gltf",
            url: "https://link.cameraah.com/NkadX",
        },
        sofa: {
            qrSelector: "see-ar-qr3",
            ios: "https://superfandotai.s3.amazonaws.com/WebAR/custom407.usdz",
            android: "https://cameraah.s3.amazonaws.com/exportedmodels/gltf/custom995.9546617632893.gltf",
            url: "https://link.cameraah.com/0k2f",
        },
        tiles: {
            qrSelector: "see-ar-qr4",
            ios: "https://superfandotai.s3.amazonaws.com/WebAR/custom947.usdz",
            android: "https://cameraah.s3.amazonaws.com/exportedmodels/gltf/custom870.4063509960424.gltf",
            url: "https://link.cameraah.com/QBB3",
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