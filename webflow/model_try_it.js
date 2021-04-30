const cors_anywhere = 'https://cors-anywhere.herokuapp.com/';
function handleCycleColor() {
    let cycle = document.querySelector('#cycle-viewer');
    document.querySelector('#red-color-btn').onclick = () => { cycle.updateMaterialColor('red body', 'red') };
    document.querySelector('#yellow-color-btn').onclick = () => { cycle.updateMaterialColor('red body', 'yellow') };
    document.querySelector('#green-color-btn').onclick = () => { cycle.updateMaterialColor('red body', '#00ff2f') };

    document.querySelector('#black-handle-color-btn').onclick = () => { cycle.updateMaterialColor('black metal', 'black') };
    document.querySelector('#white-handle-color-btn').onclick = () => { cycle.updateMaterialColor('black metal', 'white') };
    document.querySelector('#grey-handle-color-btn').onclick = () => { cycle.updateMaterialColor('black metal', 'grey') };

}
function handlePhoneCase() {
    let phone = document.querySelector('#case-viewer');
    document.querySelector('#upload-texture-btn').onclick = () => { document.querySelector('#case-texture').click() }
    document.querySelector('#case-texture').addEventListener('change', (e) => {
        let file = e.target.files[0];
        phone.updateMaterialTexture('Image MAT', URL.createObjectURL(file));
        document.querySelector('#upload-texture-btn').style.backgroundImage = "url(" + URL.createObjectURL(file) + ")";
    })
}
function handleCouch() {
    let couch = document.querySelector('#couch-viewer');
    document.querySelector('#couch-metallic').onclick = () => { couch.updateMaterialTexture('Leather', cors_anywhere + $('#couch-metallic').css("background-image").slice(4, -1).replace(/["']/g, "")) };
    document.querySelector('#couch-tiger').onclick = () => { couch.updateMaterialTexture('Leather', cors_anywhere + $('#couch-tiger').css("background-image").slice(4, -1).replace(/["']/g, "")) };
    document.querySelector('#couch-wood').onclick = () => { couch.updateMaterialTexture('Leather', cors_anywhere + $('#couch-wood').css("background-image").slice(4, -1).replace(/["']/g, "")) };

    document.querySelector('#pillow-grey').onclick = () => { couch.updateMaterialTexture('Pillow1', cors_anywhere + $('#pillow-grey').css("background-image").slice(4, -1).replace(/["']/g, "")) };
    document.querySelector('#pillow-fun').onclick = () => { couch.updateMaterialTexture('Pillow1', cors_anywhere + $('#pillow-fun').css("background-image").slice(4, -1).replace(/["']/g, "")) };
    document.querySelector('#pillow-red').onclick = () => { couch.updateMaterialTexture('Pillow1', cors_anywhere + $('#pillow-red').css("background-image").slice(4, -1).replace(/["']/g, "")) };
}
handleCycleColor();
handlePhoneCase();
handleCouch();