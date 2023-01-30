var imgs = document.querySelectorAll("");

for (var i = 0; i < imgs.length; i++) {
  imgs[i].addEventListener("click", function() {
    this.style.transform = "rotate(360deg)";
  });
}


;