document.getElementById("submit").addEventListener("click", () => {
  fetchMeal();
  document.getElementById("meal-card").innerHTML = " ";
  document.getElementById("info-area").innerHTML = " ";
});

const fetchMeal = ()=> {
  let searchQuery = document.getElementById("search-form").value;
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchQuery)
    .then(response => response.json())
    .then(data => setMeal(data)); // Return one object with meals array
}

function setMeal(mealsObj) {
  const getMeal = mealsObj.meals;
  const mealCard = document.getElementById("meal-card");

  //getMeal Array Loop
  getMeal.forEach((element) => {
    let mealCardSingleId = `meal-card-single${element.idMeal}`;
    let cardElement = `
          <img class="card-img-top pt-2" src="${element.strMealThumb}" alt="Card image cap">
          <div class="card-body">
              <p id="meal-name" class="card-text text-center">${element.strMeal}</p>
          </div>
    `;
    const div = document.createElement("div");
    div.setAttribute("class", "card m-2");
    div.setAttribute("id", mealCardSingleId);
    div.setAttribute("style", "width: 13rem");
    div.innerHTML = cardElement;
    mealCard.appendChild(div);

    //Card Click Handler
    document.getElementById(mealCardSingleId).onclick = () => {
      let infoAreaElement = `
      <div class="card" style="width: 28rem;">
        <img src="${element.strMealThumb}" class="card-img-top pt-2" alt="...">
        <div class="card-body">
          <h2>${element.strMeal}</h2>
          <p class="card-text">Ingredients - 
          <ol>
          <li>${element.strIngredient1} - ${element.strMeasure1}</li>
          <li>${element.strIngredient2} - ${element.strMeasure2}</li>
          <li>${element.strIngredient3} - ${element.strMeasure3}</li>
          <li>${element.strIngredient4} - ${element.strMeasure4}</li>
          <li>${element.strIngredient5} - ${element.strMeasure5}</li>
          <li>${element.strIngredient6} - ${element.strMeasure6}</li>
          <li>${element.strIngredient7} - ${element.strMeasure7}</li>
          <li>${element.strIngredient8} - ${element.strMeasure8}</li>
          <li>${element.strIngredient9} - ${element.strMeasure9}</li>
          <li>${element.strIngredient10} - ${element.strMeasure10}</li>
          <li>${element.strIngredient11} - ${element.strMeasure11}</li>
          <li>${element.strIngredient12} - ${element.strMeasure12}</li>
          <li>${element.strIngredient13} - ${element.strMeasure13}</li>
          <li>${element.strIngredient14} - ${element.strMeasure14}</li>
          </ol>
          </p>
        </div>
      </div>
      `;
      document.getElementById("info-area").style.display = "block";
      document.getElementById("info-area").innerHTML = infoAreaElement;
      document.getElementById("meal-card").innerHTML = " ";
    };
  });
}
