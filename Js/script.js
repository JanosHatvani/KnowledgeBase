let arrow = document.getElementsByClassName("arrow");
let img0 = document.getElementById("arrowimg0");
let img1 = document.getElementById("arrowimg1");
let img2 = document.getElementById("arrowimg2");
let img3 = document.getElementById("arrowimg3");
let img4 = document.getElementById("arrowimg4");


for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e)=>{
    let arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
  });
}
if (img0) {
    img0.addEventListener("click", (e)=>{
    let arrowParentimg = e.target.parentElement.parentElement.parentElement;
    arrowParentimg.classList.toggle("showMenu");
  });
}
if (img1) {
  img1.addEventListener("click", (e)=>{
  let arrowParentimg = e.target.parentElement.parentElement.parentElement;
  arrowParentimg.classList.toggle("showMenu");
});
}
if (img2) {
  img2.addEventListener("click", (e)=>{
  let arrowParentimg = e.target.parentElement.parentElement.parentElement;
  arrowParentimg.classList.toggle("showMenu");
});
}
if (img3) {
  img3.addEventListener("click", (e)=>{
  let arrowParentimg = e.target.parentElement.parentElement.parentElement;
  arrowParentimg.classList.toggle("showMenu");
});
}
if (img4) {
  img4.addEventListener("click", (e)=>{
  let arrowParentimg = e.target.parentElement.parentElement.parentElement;
  arrowParentimg.classList.toggle("showMenu");
});
}


let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".logo-details");

if (sidebarBtn) {
  sidebarBtn.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
  });
}