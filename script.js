document.getElementById("submit").addEventListener("click", () => {
  let searchQuery = document.getElementById("search-form").value;
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchQuery)
    .then((response) => response.json())
    .then((data) => setMeal(data)); // Return one object with meals array
    document.getElementById("meal-card").innerHTML = " ";
    document.getElementById("info-area").innerHTML = " ";

});

function setMeal(mealsObj) {
  const getMeal = mealsObj.meals;
  const mealCard = document.getElementById("meal-card");
  for (let i = 0; i < getMeal.length; i++) {
    let mealCardSingleId = `meal-card-single${i}`;
    let cardElement = `
          <img class="card-img-top pt-2" src="${getMeal[i].strMealThumb}" alt="Card image cap">
          <div class="card-body">
              <p id="meal-name" class="card-text text-center">${getMeal[i].strMeal}</p>
          </div>
    `;
    const div = document.createElement("div");
    div.setAttribute("class", "card m-2");
    div.setAttribute("id", mealCardSingleId)
    div.setAttribute("style", "width: 13rem");
    div.innerHTML = cardElement;
    mealCard.appendChild(div);
    document.getElementById(mealCardSingleId).onclick = () => {
      let infoAreaElement = `Ingredients - 
      ${getMeal[i].strIngredient1}|
      ${getMeal[i].strIngredient2}|
      ${getMeal[i].strIngredient3}|
      ${getMeal[i].strIngredient4}|
      ${getMeal[i].strIngredient5}|
      ${getMeal[i].strIngredient6}|
      ${getMeal[i].strIngredient7}|
      ${getMeal[i].strIngredient8}|
      ${getMeal[i].strIngredient9}|
      ${getMeal[i].strIngredient10}|
      ${getMeal[i].strIngredient11}|
      ${getMeal[i].strIngredient12}|
      ${getMeal[i].strIngredient13}|
      ${getMeal[i].strIngredient14}
      ` 
      document.getElementById("info-area").innerHTML = infoAreaElement;
    }
  }
}

// const mealCardSingle = document.getElementById("meal-card-single");
// mealCardSingle.onclick = () => {

// }

