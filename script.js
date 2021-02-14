document.getElementById("search-form").addEventListener("keyup", event =>{
  let keyPressSearchQuery = document.getElementById("search-form").value;
  if (keyPressSearchQuery == "") {
    document.getElementById("meal-null").style.display = "block";
  } else {
    if(event.key == "Enter"){
      fetchMeal(keyPressSearchQuery);
      document.getElementById("meal-null").style.display = "none";
  }

  }
  document.getElementById("meal-card").innerHTML = " ";
});

//Submit Button Handler
document.getElementById("submit").addEventListener("click", () => {
  let searchQuery = document.getElementById("search-form").value;
  if (searchQuery == "") {
    document.getElementById("meal-null").style.display = "block";
  } else {
    fetchMeal(searchQuery);
    document.getElementById("meal-null").style.display = "none";
  }
  document.getElementById("meal-card").innerHTML = " ";

  // This Section is for Info Area [Alternative of Modal]
  // document.getElementById("info-area").innerHTML = " ";
});

//fetchMeal will take query from input box and pass it to the api to get the meal object
const fetchMeal = (query) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(response => response.json())
    .then(data => setMeal(data))
    .catch(()=>{
      document.getElementById("meal-null").style.display = "block";
      console.log("Api couldn't resolve for Desired Search Query");
      
    }); // Return one object with meals array
};

//setMeal will take data object from fetchMeal to show the data in html body
const setMeal = (mealsObj) => {
  const getMeal = mealsObj.meals;
  const mealCard = document.getElementById("meal-card");

  //getMeal Array Loop
  getMeal.forEach((element) => {
    let mealCardSingleId = `meal-card-single${element.idMeal}`;

    //Mead Card & Modal Html
    let cardElement = `
          <img class="card-img-top pt-2" src="${element.strMealThumb}" alt="Card image cap">
          <div class="card-body">
              <h4 id="meal-name" class="card-text text-center">${element.strMeal}</h4>
          </div>
          <!-- Modal -->
          <div class="modal fade" id="exampleModal-${element.idMeal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
              <!--  
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">${element.strMeal}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                -->
                <div class="modal-body">
                    <img src="${element.strMealThumb}" class="card-img-top pt-2" alt="...">
                      <h2>${element.strMeal}</h2>
                      <p class="card-text"><b>Ingredients -</b> </p>
                      <ol id="ingredient-${element.idMeal}">
                      
                      </ol>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
    `;

    //Creating a div to show the meal card & modal id is dynamically set here
    const div = document.createElement("div");
    div.setAttribute("class", "card m-2");
    div.setAttribute("id", mealCardSingleId);
    div.setAttribute("style", "width: 13rem");
    div.setAttribute("data-bs-toggle", "modal");
    div.setAttribute("data-bs-target", `#exampleModal-${element.idMeal}`);
    div.innerHTML = cardElement;
    mealCard.appendChild(div);

    //Meal Card Click Handler
    document.getElementById(mealCardSingleId).onclick = (event) => {
      if(event.detail> 1){
        alert("Plese click patiently");
        
      }else{
        document.getElementById(`ingredient-${element.idMeal}`).innerHTML = "";
        getMealInfo(element.idMeal);
      }

      /* This Section is for Info Area [Alternative of Modal]
      let infoAreaElement = `
      <div class="card" style="width: 28rem;">
        <img src="${element.strMealThumb}" class="card-img-top pt-2" alt="...">
        <div class="card-body">
          <h2>${element.strMeal}</h2>
          <p class="card-text"><b>Ingredients -</b> 
          <ol id="ingredient">
          
          </ol>
          </p>
        </div>
      </div>
      `;
      document.getElementById("info-area").style.display = "block";
      document.getElementById("info-area").innerHTML = infoAreaElement;
      document.getElementById("meal-card").innerHTML = " ";
      */
    };
  });
};

//getMealInfo will take an meal id from single meal card and Fetch data from api for single Meal
const getMealInfo = async (mealObjId) => {
  console.log(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealObjId}`
  );

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealObjId}`
  );
  const data = await res.json();
  displayMealInfo(data);

  /* Fetch without Async
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealObjId}`)
    .then(response => response.json())
    .then(data => {
      displayMealInfo(data);  
    })
    .catch(()=>console.log("Error : API Didn't Return anything"));
    */
};

//displaymealInfo will take the data from getMealInfo and generate ingredients,measure for the modal
const displayMealInfo = (singleMealObj) => {
  const mealSingleInfo = singleMealObj.meals[0];
  const ingredientId = `ingredient-${mealSingleInfo["idMeal"]}`;

  for (let i = 1; i <= 20; i++) {
    const ingredient = document.getElementById(ingredientId);
    if (
      mealSingleInfo[`strIngredient${i}`] != null &&
      mealSingleInfo[`strIngredient${i}`] != ""
    ) {
      const element = `${mealSingleInfo[`strIngredient${i}`]} - ${
        mealSingleInfo[`strMeasure${i}`]
      }`;
      const li = document.createElement("li");
      li.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${element}`;
      ingredient.appendChild(li);
    }
  }
};
