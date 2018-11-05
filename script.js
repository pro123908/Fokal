const placeholders = {
  title: "Enter title",
  price: "Enter price",
  description: "Description...",
  lat : "Enter Latitude",
  lng : "Enter Longitude"
};

function formSubmitted(e){
  var title = document.getElementById("title").value.trim();
  var price = document.getElementById("price").value.trim();
  var description = document.getElementById("description").value.trim();
  var lat = document.getElementById("lat").value.trim();
  var lng = document.getElementById("lng").value.trim();
  var imageURL = document.getElementById('url').value.trim();
  var category = document.getElementById('services').value.trim();

  var data = {
    title,price,description,imageURL,category,latLng : {
      latitude : lat,
      longitude : lng
    }
  }
  console.log(data);
  
};

const focused = field => {
  var input = document.getElementById(field);
  input.placeholder = "";
  input.parentNode.style.borderBottom = "2px solid #7f7f7f";
};

const unFocused = field => {
  var input = document.getElementById(field);
  input.placeholder = placeholders[field];
  input.parentNode.style.borderBottom = "2px solid #d9d9d9";
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


const getImageURL = () => {

   // For displaying name of the file which is selected when making post
   var Pic = document.querySelector("input[name='image']").files[0];
   
   document.querySelector(".pic-name").innerHTML = Pic.name;

  console.log("Fetching")
  var imageElement = document.getElementById("image");
  var image = imageElement.files[0];
  getBase64(image)
    .then(base64 => {
      axios.post('https://api.ideamatch.me/v1/upload',{image : base64})
      .then(res => {
        var url = res.data.data.imagePath;
        document.getElementById("url").value = url;
        console.log("Done")
      })
      .catch(err => {
        console.log(err);
        alert("Error Occurred, check console for details")
      })
    })
    .catch(err => {
      console.log(err);
      alert("Error Occurred, check console for details")
    })
}

var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
      /*when an item is clicked, update the original select box,
            and the selected item:*/
      var y, i, k, s, h;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      h = this.parentNode.previousSibling;
      for (i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          for (k = 0; k < y.length; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
    except the current select box:*/
  var x,y,i,arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

function postPicSelected(container) {
  // For displaying name of the file which is selected when making post
  var Pic = document.querySelector("input[name='image']").files[0];
  console.log(Pic.name);
  document.querySelector(".pic-name").innerHTML = Pic.name;
}