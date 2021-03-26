$(document).ready(function(){

  // function get product
  function getID(x){
    var getId = $(x).closest("tr").find("p.id").text()
    getId = getId.slice(7,getId.length)
    return getId
  }
  
  // count products in cart
  // var count = 0

  var cart = localStorage.getItem("products")
  if(cart){
    cart = JSON.parse(cart)
    var content = ""
    var total = 0
    console.log(cart)
    Object.keys(cart).map(function(keys, value){
      
      // console.log(cart[keys])
      var id = cart[keys]["id"]
      var img = cart[keys]["img"]
      var price = cart[keys]["price"]
      var productName = cart[keys]["productname"]
      var qty = cart[keys]["qty"]
      var numPrice = parseInt(price.slice(1,price.length))
      var total_money = qty * numPrice
      total += total_money
      
      content += "<tr>" +
                  "<td class='cart_product'>" +
                    "<a href=''><img src='"+ img + "' alt=''></a>" +
                  "</td>" +
                  "<td class='cart_description'>" +
                    "<h4><a href=''>" + productName + "</a></h4>" +
                    "<p class='id'>Web ID:" + id + "</p>" +
                  "</td>" +
                  "<td class='cart_price'>" +
                    "<p>" + price + "</p>" +
                  "</td>" +
                  "<td class='cart_quantity'>" +
                    "<div class='cart_quantity_button'>" +
                      "<a class='cart_quantity_up' > + </a>" +
                      "<input class='cart_quantity_input' type='text' name='quantity' value='" + qty +"' autocomplete='off' size='2'>" +
                      "<a class='cart_quantity_down' > - </a>" +
                    "</div>" +
                  "</td>" +
                  "<td class='cart_total'>" +
                    "<p class='cart_total_price'>" + "$" + total_money + "</p>" +
                  "</td>" +
                  "<td class='cart_delete'>" +
                    "<a class='cart_quantity_delete' ><i class='fa fa-times'></i></a>" +
                  "</td>" +
                "</tr>"
    })
    $("table tbody").append(content);
    $("span.total").text("$"+total)

    $("a.cart_quantity_up").click(function(){

      // Get productID
      // var getId = $(this).closest("tr").find("p.id").text()
      // getId = getId.slice(7,getId.length)

      var getId = getID(this)

      var getQty = parseInt($(this).next().val()) + 1
      $(this).next().val(getQty)

      // get Price
      var priceP = cart[getId]['price']
      var numPrice = parseInt(priceP.slice(1,priceP.length))
      var upTotalMoney = numPrice * getQty
      $(this).closest("tr").find("p.cart_total_price").text("$" + upTotalMoney)
    
      cart[getId]["qty"] = getQty
      total += numPrice
      $("span.total").text("$"+total)
      localStorage.setItem("products",JSON.stringify(cart))
    })
    
    $("a.cart_quantity_down").click(function(){
      // Get productID
      var getId = getID(this)

      // get product price
      var priceP = cart[getId]['price']
      var numPrice = parseInt(priceP.slice(1,priceP.length))
        
      var getQty = parseInt($(this).prev().val()) - 1
      if (getQty < 1) {
        $(this).closest("tr").hide()
        delete cart[getId]
        total -= numPrice
        $("span.total").text("$"+total)
      }
      else{
        $(this).prev().val(getQty)
        var upTotalMoney = numPrice * getQty
        $(this).closest("tr").find("p.cart_total_price").text("$" + upTotalMoney)
      
        cart[getId]["qty"] = getQty
        total -= numPrice
        $("span.total").text("$"+total)
      }
      localStorage.setItem("products",JSON.stringify(cart))
    })

    $("a.cart_quantity_delete").click(function(){
      $(this).closest("tr").hide()

      // Get productID
      var getId = getID(this)

      var getQty = cart[getId]["qty"]
      var priceP = cart[getId]["price"]
      var numPrice = parseInt(priceP.slice(1,priceP.length))
      var intoMoney = numPrice * getQty
      total -= intoMoney
      $("span.total").text("$"+(total))
      delete cart[getId]
      localStorage.setItem("products",JSON.stringify(cart))
    })
  }
})