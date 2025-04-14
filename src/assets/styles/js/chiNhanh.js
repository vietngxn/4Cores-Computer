function northSideSelect(){
    document.getElementById("southside").classList.remove("selection-side")
    document.getElementById("northside").classList.add("selection-side")
    document.getElementById("northTitle").classList.add("selection-side-title")
    document.getElementById("southTitle").classList.remove("selection-side-title")
    document.getElementById("northsideImg").classList.add("selection-side-img")
    document.getElementById("southsideImg").classList.remove("selection-side-img")
    document.getElementById("northsideShow").classList.add("display-show")
    document.getElementById("southsideShow").classList.remove("display-show")

}
function southSideSelect(){
    document.getElementById("southside").classList.add("selection-side")
    document.getElementById("northside").classList.remove("selection-side")
    document.getElementById("southTitle").classList.add("selection-side-title")
    document.getElementById("northTitle").classList.remove("selection-side-title")
    document.getElementById("southsideImg").classList.add("selection-side-img")
    document.getElementById("northsideImg").classList.remove("selection-side-img")
    document.getElementById("northsideShow").classList.remove("display-show")
    document.getElementById("southsideShow").classList.add("display-show")
}