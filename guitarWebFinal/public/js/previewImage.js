window.addEventListener('load', function () {
    const inpFile = document.getElementById("product_images");
    const previewContainer = document.getElementById("imagePreview");
    const previewImage = previewContainer.querySelector(".image-preview-image");
    const previewText = previewContainer.querySelector(".image-preview-text");

    inpFile.addEventListener("change", function () {
        const file = this.files[0];

        if(file){
            const reader = new FileReader();
            previewText.style.display = "none";
            previewImage.style.display = "block";
    
            reader.addEventListener("load", function(){
                
                previewImage.setAttribute("src", this.result);
            });
    
            reader.readAsDataURL(file);
        }
        else{
            previewText.style.display = null;
            previewImage.style.display = null;
        }
    });
});