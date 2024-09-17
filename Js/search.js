function searchFunction() {
  
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  carditems = document.getElementById("container");
  card = document.getElementsByClassName("card");
  content = document.getElementsByClassName("content");
  ul = document.getElementsByClassName("list");


  for (i = 0; i < ul.length && content.length; i++) {
    p = content[i].getElementsByTagName("p")[0];    
    h3 = content[i].getElementsByTagName("h3")[0];
    li1 = ul[i].getElementsByTagName("li")[0];
    li2 = ul[i].getElementsByTagName("li")[1];
    li3 = ul[i].getElementsByTagName("li")[2];      
    txtValue1 = li1.textContent || li1.innerText;
    txtValue2 = li2.textContent || li2.innerText;
    txtValue3 = li3.textContent || li3.innerText;
    txtValue5 = p.textContent || p.innterText;
    txtValue4 = h3.textContent || h3.innterText;
    
        
    if (((txtValue1.toUpperCase().indexOf(filter)) && (txtValue2.toUpperCase().indexOf(filter)) && (txtValue3.toUpperCase().indexOf(filter)) && (txtValue4.toUpperCase().indexOf(filter)) && (txtValue5.toUpperCase().indexOf(filter))) > -1){
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
}