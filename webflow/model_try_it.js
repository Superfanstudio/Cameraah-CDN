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
    addonClick('#couch-metallic', () => { updateModel(couch, TEXTURE, 'Leather', 'https://cameraah-labs.s3.ap-south-1.amazonaws.com/Website+assets/couch-texture-1.jpg') });
    addonClick('#couch-tiger', () => { updateModel(couch, TEXTURE, 'Leather', 'https://cameraah-labs.s3.ap-south-1.amazonaws.com/Website+assets/couch-texture-2.jpg') });
    addonClick('#couch-wood', () => { updateModel(couch, TEXTURE, 'Leather', 'https://cameraah-labs.s3.ap-south-1.amazonaws.com/Website+assets/couch-texture-3.jpg') });

    addonClick('#pillow-grey', () => { updateModel(couch, TEXTURE, 'Pillow1', 'https://cameraah-labs.s3.ap-south-1.amazonaws.com/Website+assets/pillow-texture-1.jpg') });
    addonClick('#pillow-fun', () => { updateModel(couch, TEXTURE, 'Pillow1', 'https://cameraah-labs.s3.ap-south-1.amazonaws.com/Website+assets/pillow-texture-2.jpg') });
    addonClick('#pillow-red', () => { updateModel(couch, TEXTURE, 'Pillow1', 'https://cameraah-labs.s3.ap-south-1.amazonaws.com/Website+assets/pillow-texture-3.jpg') });
}

handleCycleColor();
handlePhoneCase();
handleCouch();