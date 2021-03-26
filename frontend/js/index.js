$(document).ready(function(){
  var cart = new Object
  var count = 0
  // var isCart = localStorage.getItem("products")
  if (localStorage.getItem("products")) {
    cart = JSON.parse(localStorage.getItem("products"))
    count = Object.keys(cart).length
    // console.log(count)
  }
  $("a.add-to-cart").click(function(){
    // Lấy thuộc tính của sản phẩm
    var getId = $(this).closest("div.single-products").find(".productinfo").attr("id")
    var getImg = $(this).closest("div.single-products").find(".productinfo").find("img").attr("src")
    var getPrice = $(this).closest("div.single-products").find(".productinfo").find("h2").text()
    var getProductName = $(this).closest("div.single-products").find(".productinfo").find("p").text()
    var qty = 1

    if(localStorage.getItem("products")){
      cart = JSON.parse(localStorage.getItem("products"))
      count = Object.keys(cart).length
      var isProduct = false
      Object.keys(cart).map(function(keys,index){
        product = cart[keys]
        if (product["id"] == getId) {
          qty = parseInt(product["qty"]) + 1
          isProduct = true
        }
      })
      if (!isProduct) {
        count++
      }
    }else{
      count++
    }

    // //  Kiểm tra kết quả
    // // console.log(count)
    // console.log(getId)
    // console.log(getImg)
    // console.log(getPrice)
    // console.log(getProductName)

    // thêm sản phẩm vào object cart
    cart[getId] = {
      "id":getId,
      "img":getImg,
      "price":getPrice,
      "productname":getProductName,
      "qty":qty
    }
    $("a.cart").text(count)
    // thêm obj vào localStorage
    localStorage.setItem("products",JSON.stringify(cart))
  })
  if (count != 0) {
    $("a.cart").text(count)
  }
})