const breakpoint = 1024;

window.onload = function () {
    const checkbox = document.getElementById("sliderCheckbox");
    const sliderEl = document.getElementById("sliderEl");
    const sliderMask = document.getElementById("sliderMask");
    const categotyEls = document.querySelectorAll("aside > nav > section > div");

    categotyEls.forEach(function (item) {
        item.addEventListener("click", function () {
            item.parentElement.classList.toggle("category-active")
        })
    });

    checkbox.addEventListener("change", function () {
        if (document.body.clientWidth >= breakpoint) return;

        if (checkbox.checked) {
            sliderEl.classList.add("slider-show");
            sliderMask.classList.add("mask-show");
        } else {
            sliderEl.classList.remove("slider-show");
            sliderMask.classList.remove("mask-show");
        }
    });

    sliderMask.addEventListener("click", function () {
        if (document.body.clientWidth >= breakpoint) return;

        checkbox.checked = false;
        sliderEl.classList.remove("slider-show");
        sliderMask.classList.remove("mask-show");
    })

    hljs.registerLanguage('markup', window.hljsXML);
    document.querySelectorAll('#docsContent pre code').forEach((el) => {
        hljs.highlightElement(el);
    });
}