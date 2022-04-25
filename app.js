/* Set up cart*/
let addItemBtns = document.querySelectorAll(".addItem");
let emptyCart = document.querySelector("#empty-cart");
let removeItemBtns = document.querySelectorAll(".removeItem");
let cartFullContainer = document.querySelector("#full-cart-container");
let dishContainer = document.querySelector('.dish-holder');

for (let i = 0; i < addItemBtns.length; i++) {
    addItemBtns[i].addEventListener('click', () => {
        calculateItemsAmount(dishes[i]); // passing dishes with index to function 
        totalCost(dishes[i].price);
        displayItemAmount();
    })

}

window.onload = () => {
    displayItemAmount();
    displayConfirmation();
    displayCart();
}


//how many items in the cart

function calculateItemsAmount(dish) {
    let itemNumber = localStorage.getItem('dishNumber');
    itemNumber = parseInt(itemNumber); // converts string data from local storage to number
    if (itemNumber) {
        localStorage.setItem('dishNumber', itemNumber + 1);
        document.querySelector(".cartItem").textContent = localStorage.getItem('dishNumber');
    } else {
        localStorage.setItem('dishNumber', 1);
        document.querySelector(".cartItem").textContent = null;
    }

    setDishes(dish);

}

function displayItemAmount() {

    let itemNumber = localStorage.getItem('dishNumber');
    if (itemNumber > 0) {
        document.querySelector(".cartItem").innerHTML = itemNumber;
    } else {
        document.querySelector(".cartItem").innerHTML = null;
    }
}

function totalCost(price){
    let cartCost = localStorage.getItem("totalCost");
    localStorage.setItem("totalCost", price);
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + price);
    }

}

/*Display cart's data*/

function displayCart(){
    let food = localStorage.getItem("dishInCart");
    let total = localStorage.getItem("totalCost");
    let dishNumber =  localStorage.getItem("dishNumber");
    food = JSON.parse(food);
    let dishContainer = document.querySelector('.dish-holder');
    let totalData = document.querySelector('.Cost-data');

    if(dishNumber > 0 && dishContainer){
        document.querySelector('#empty-cart').style.display = 'none';
        dishContainer.innerHTML = '';
        document.querySelector('#titleCart').innerHTML = "Your cart";
         Object.values(food).map(item => {
            dishContainer.innerHTML += `<div class="type-meal-container-inside">
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}<span>${item.price}</span></h3>
                    <p style ="margin-top:1em">Ingredients: ${item.Ingredients}</p>
                    <div class="cartQ">
                            <button class="plusMinus plusBtn">+</button>
                            <span>${item.inCart}</span>
                            <button class="removeBtn plusMinus">-</button>
                    </div>      
                 </div>`});
            totalData.innerHTML = `<h3 id="total-data">Your total is: $${total}</h3><button id="pay" onClick = 'sendtoPay()' id="payBtn"'>Pay</button>`;
            //Add item button
             let plusBtn = document.querySelectorAll(".plusBtn");
             for (let i = 0; i < plusBtn.length; i++){
                 plusBtn[i].addEventListener('click', function(){
                     Object.values(food)[i].inCart = Object.values(food)[i].inCart + 1;
                     //push new data to storage
                     let itemNumber = localStorage.getItem('dishNumber');
                     itemNumber = parseInt(itemNumber);
                     localStorage.setItem('dishNumber', itemNumber + 1);
                     totalCost(Object.values(food)[i].price);
                     setDishes(Object.values(food)[i]);
                     displayItemAmount();
                     displayCart();
                    
                 })
             }
             
             
             //Remove item button
             let removeBtn = document.querySelectorAll(".removeBtn");
             for (let i=0; i < removeBtn.length; i++){
                removeBtn[i].addEventListener('click', function(){
                    Object.values(food)[i].inCart = Object.values(food)[i].inCart - 1; // remove one item from the targeted object
                    //change dishNumber
                    let itemNumber = localStorage.getItem('dishNumber');
                    itemNumber = parseInt(itemNumber);
                    localStorage.setItem('dishNumber', itemNumber - 1);
                    displayItemAmount();
                    if(localStorage.getItem('dishNumber') < 0){
                    localStorage.setItem('dishNumber', 0);
                    };

                    //calculate total
                    let cartCost = localStorage.getItem("totalCost");
                    if(cartCost > 0){
                        cartCost = parseInt(cartCost);
                        localStorage.setItem("totalCost", cartCost - Object.values(food)[i].price);
                    }
                    else
                    {
                        localStorage.setItem("totalCost", "0");

                    }
                    
                    //update dishInCart

                    if(Object.values(food)[i].inCart <= 0){
                        Object.values(food)[i].inCart = 0;
                        //console.log(food[Object.values(food)[i].name].name); //access to food item name  
                        delete food[[Object.values(food)[i].name]];
                        localStorage.setItem("dishInCart", JSON.stringify(food));
                        console.log('this after delete', food);
                        displayCart();
                        if (Object.keys(food).length === 0){
                            console.log('This is empty food', food);
                            localStorage.removeItem("dishInCart");
                            document.querySelector('#empty-cart').style.display = 'block';
                            dishContainer.style.display = 'none';
                            totalData.style.display = 'none';
                            document.querySelector('#titleCart').style.display = 'none';
                        }
                    }
                    else{
                        console.log('this is food no mods',food);   
                        localStorage.setItem("dishInCart", JSON.stringify(food))
                        displayCart();
                    }
                })
            }
    }
        
    }
              

function setDishes(dish) {

    let cartItems = localStorage.getItem('dishInCart');
    cartItems = JSON.parse(cartItems); // JSON string to Object

        if (cartItems != null) {

        
            if (cartItems[dish.name] === undefined) {
                cartItems = {
                    ...cartItems,
                    [dish.name]: dish
                }
            }
            cartItems[dish.name].inCart += 1;

    
        } else {
            dish.inCart = 1;

                cartItems = {
                    [dish.name]: dish
                 
                }
            }
            localStorage.setItem("dishInCart", JSON.stringify(cartItems));
        }
    
  
   
    

function sendtoPay(){
 
   window.location = './pay.html';
}



function displayConfirmation(){
   if(document.querySelector(".order-details")){
    document.querySelector(".cartItem").innerHTML = null; 
        let orderDetails = document.querySelector(".order-details");
        let orderedFood = localStorage.getItem("dishInCart");
        orderedFood =  JSON.parse(orderedFood);
        let orderTotal = localStorage.getItem("totalCost");
        orderDetails.innerHTML = `<tr>
            <th>Dishes</th>
            <th>Quantity</th>
            <th>Price Paid</th>
        </tr>`
        Object.values(orderedFood).map(item => {
        orderDetails.innerHTML += `<tr>
            <td>${item.name}</td>
            <td>${item.inCart}</td>
            <td>${item.price*item.inCart}</td>
        </tr>
        `;
    })
    orderDetails.innerHTML += `
    <td colspan=3 id='totalOrder'>Total: $${orderTotal} </td>`
    document.addEventListener('click', function cleanData(){
        localStorage.removeItem("dishInCart");
        localStorage.removeItem("dishNumber");
        localStorage.removeItem("totalCost");
    })
       
}
   
}



let dishes = [
    {
        name: 'Salmon Rolls',
        price: 27,
        inCart: 0,
        img: "./media/salmon-rolls.jpg",
        Ingredients: 'salmon, avocado',
    },

    {
        name: 'Seafood Plate',
        price: 35,
        inCart: 0,
        img: "./media/seafood-2.jpg",
        Ingredients: 'Octopus, shrimps, lemon'
    },

    {
        name: 'Greek Salad',
        price: 13,
        inCart: 0,
        img: "./media/salads.jpg",
        Ingredients: 'Feta cheese, tomatoes'
    },

    {
        name: 'Omelet',
        price: 13,
        inCart: 0,
        img: "./media/omelet-4.jpg",
        Ingredients: 'Eggs, milk'
    },

    {
        name: 'Pork Chops',
        price: 27,
        inCart: 0,
        img: "./media/meat-1.jpg",
        Ingredients: 'pork, tomatoes'
    },

    {
        name: 'Roastbeef',
        price: 35,
        inCart: 0,
        img: "./media/meat.jpg",
        Ingredients: 'Beef, tomatoes, lettuce'
    },

    {
        name: 'Ham omelet',
        price: 12,
        inCart: 0,
        img: "./media/omlette.jpg",
        Ingredients: 'Eggs, milk, ham'
    },

    {
        name: 'Caesar salad',
        price: 12,
        inCart: 0,
        img: "./media/salad-2.jpg",
        Ingredients: 'Chicken, tomatoes, lettuce'
    },


    {
        name: 'Mushroom omelet',
        price: 15,
        inCart: 0,
        img: "./media/omelette-2.jpg",
        Ingredients: 'Eggs, milk, mushrooms'
    },

    {
        name: 'Raspberry Waffles',
        price: 12,
        inCart: 0,
        img: "./media/waffle-1.jpg",
        Ingredients: 'Eggs, milk, raspberry'
    },

    {
        name: 'Chocolate Waffles',
        price: 12,
        inCart: 0,
        img: "./media/waffles.jpg",
        Ingredients: 'Eggs, milk, chocolate'
    },


    {
        name: 'Strawberry omelet',
        price: 15,
        inCart: 0,
        img: "./media/omelet-3.jpg",
        Ingredients: 'Eggs, milk, strawberry'
    },


    {
        name: 'Lavander Latte',
        price: 5,
        inCart: 0,
        img: "./media/latte.jpg",
        Ingredients: 'lavender syrup, coffee'
    },


    {
        name: 'Orange Juice',
        price: 15,
        inCart: 0,
        img: "./media/juice.jpg",
        Ingredients: 'Oranges'
    },

];
