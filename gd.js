
        let iconCart = document.querySelector('#carticon');
        let body = document.querySelector('body');
        let closeCart = document.querySelector('#close-cart');


        iconCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
        })

        closeCart.addEventListener('click', () => {
        body.classList.toggle('showCart');

        })

        if(document.readyState == "loading"){
            document.addEventListener("DOMContentLoaded", ready);
        }else{
            ready();
        }

        function ready(){
            var removeCartButtons = document.getElementsByClassName('cart-remove');
            console.log(removeCartButtons)
            for (var i = 0; i < removeCartButtons.length; i++){
                var button=removeCartButtons[i]
                button.addEventListener('click' ,removeCartItem);
            }

            var quantityInputs  = document.getElementsByClassName('cart-quantity')
            for (var i = 0; i < quantityInputs.length; i++){
                var input = quantityInputs[i]
                input.addEventListener('change',quantityChanged);
            }

            var addCart = document.getElementsByClassName('cart');
            for (var i = 0; i < addCart.length; i++){
                var button = addCart[i]
                button.addEventListener("click",addCartClicked);
            }
            
            document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);

        }

        function buyButtonClicked(){
            alert("your Order is placed successfully");
            var cartContent = document.getElementsByClassName("cartcontent")[0];
            while(cartContent.hasChildNodes()){
                cartContent.removeChild(cartContent.firstChild);
            }
    
                updatetotal();
        }

        function removeCartItem(event){
            var buttonClicked = event.target;
            buttonClicked.parentElement.remove();
            updatetotal();
        }

        function quantityChanged(event){
            var input = event.target;
            if (isNaN (input.value) || input.value <= 0){
                input.value = 1;
            }
            updatetotal();  
        }

        function addCartClicked(event){
            var button = event.target
            var shopProducts = button.parentElement
            var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
            var price = shopProducts.getElementsByClassName("price")[0].innerText;
            var productImg = shopProducts.getElementsByClassName("product-img")[0].src;  
            addproductToCart(title,price,productImg);
            updatetotal();
        }

        function addproductToCart(title,price,productImg){
            var cartShopBox = document.createElement("cartbox");
            cartShopBox.classList.add('cartbox');
            var cartItems=document.getElementsByClassName('cartcontent')[0];
            var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
            for (var i = 0; i < cartItemsNames.length; i++){
                if(cartItemsNames[i].innerText == title){
                alert("You have already add this item to cart");
                return;
            }
        }
        
        var cartBoxContent=`
        <img src="${productImg}" alt="" class="cart-img"><div class="detailbox"><div class="cart-product-title">${title}</div><div class="cart-price">${price}</div><input type="number" value="1" class="cart-quantity"></div> <i class="fal fa-trash-alt cart-remove"></i>`;

        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);
        cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener('click',removeCartItem);
        cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener('change',quantityChanged);
    }



        function updatetotal(){
            var cartContent = document.getElementsByClassName('cartcontent')[0];
            var cartBoxes = cartContent.getElementsByClassName('cartbox')
            var total =0;
            for (var i = 0; i < cartBoxes.length; i++){
                var cartBox =cartBoxes[i];
                var priceElement = cartBox.getElementsByClassName('cart-price')[0];
                var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
                var price = parseFloat(priceElement.innerText.replace("₹",""));
                var quantity = quantityElement.value;
                total = total + price * quantity;
            }
                total = Math.round(total *100)/100;
            
                document.getElementsByClassName('Total-price')[0].innerText = '₹' + total;
            
        }
        