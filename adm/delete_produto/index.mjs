var inputs = document.getElementsByClassName("input-transform");

for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function() {
        var texto = this.value;
        this.value = texto.toUpperCase();
    });
}