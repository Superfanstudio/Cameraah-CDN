const cors_anywhere = 'https://cors-anywhere.herokuapp.com/';
const COLOR = 0;
const TEXTURE = 1;
function updateModel(model, type, modelComponent, newValue) {
    switch (type) {
    case COLOR:
        model.updateMaterialColor(modelComponent, newValue);
        break;
    case TEXTURE:
        model.updateMaterialTexture(modelComponent, newValue);
        break;
    default:
        break;
    }    
}

function addonClick(selector, callback) {
    $(selector).on('click', callback);
}

function handleCycleColor() {
    let cycle = document.querySelector('#cycle-viewer');
    addonClick('#red-color-btn', () => { updateModel(cycle, COLOR, 'red body', 'red') });
    addonClick('#yellow-color-btn', () => { updateModel(cycle, COLOR, 'red body', 'yellow') });
    addonClick('#green-color-btn', () => { updateModel(cycle, COLOR, 'red body', '#00ff2f') });

    addonClick('#black-handle-color-btn', () => { updateModel(cycle, COLOR, 'black metal', 'black') });
    addonClick('#white-handle-color-btn', () => { updateModel(cycle, COLOR, 'black metal', 'white') });
    addonClick('#grey-handle-color-btn', () => { updateModel(cycle, COLOR, 'black metal', 'grey') });

}
function handlePhoneCase() {
    let phone = document.querySelector('#case-viewer');
    addonClick('#upload-texture-btn', () => { $('#case-texture').click() });
    $('#case-texture').on('change', e => {
        let file = e.target.files[0];
        updateModel(phone, TEXTURE, 'Image MAT', URL.createObjectURL(file));
        $('#upload-texture-btn').css('background-image', `url("${URL.createObjectURL(file)}")`);
    })
}
function handleCouch() {
    let couch = document.querySelector('#couch-viewer');
    addonClick('#couch-metallic', () => { convertImgToBase64URL('https://cameraah-labs.s3.ap-south-1.amazonaws.com/Website+assets/couch-texture-1.jpg', (url) => updateModel(couch, TEXTURE, 'Leather', url)) });
    addonClick('#couch-tiger', () => { convertImgToBase64URL('https://cameraah-labs.s3.ap-south-1.amazonaws.com/Website+assets/couch-texture-2.jpg', (url) => updateModel(couch, TEXTURE, 'Leather', url)) });
    addonClick('#couch-wood', () => { convertImgToBase64URL('https://cameraah-labs.s3.ap-south-1.amazonaws.com/Website+assets/couch-texture-3.jpg', (url) => updateModel(couch, TEXTURE, 'Leather', url)) });

    addonClick('#pillow-grey', () => { convertImgToBase64URL('https://cameraah-labs.s3.ap-south-1.amazonaws.com/Website+assets/pillow-texture-1.jpg', (url) => updateModel(couch, TEXTURE, 'Pillow1', url)) });
    addonClick('#pillow-fun', () => { convertImgToBase64URL('https://cameraah-labs.s3.ap-south-1.amazonaws.com/Website+assets/pillow-texture-2.jpg', (url) => updateModel(couch, TEXTURE, 'Pillow1', url)) });
    addonClick('#pillow-red', () => { convertImgToBase64URL('https://cameraah-labs.s3.ap-south-1.amazonaws.com/Website+assets/pillow-texture-3.jpg', (url) => updateModel(couch, TEXTURE, 'Pillow1', url)) });
}

handleCycleColor();
handlePhoneCase();
handleCouch();

function convertImgToBase64URL(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'), dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null; 
    };
    img.src = url;
}