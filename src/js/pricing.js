window.onload = function () {
    const pricingList = document.getElementById("pricingList");
    const linkList = document.querySelectorAll("#pricingList > li > a");

    function initState() {
        for (var i = 0; i < linkList.length; i++) {
            linkList[i].classList.remove("tab-active");
        }
    }

    pricingList.addEventListener('click', function (e) {
        initState();
        const linkEl = e.target;
        if (linkEl.tagName.toLowerCase() !== "a") return;
        linkEl.classList.add("tab-active");
    })
}