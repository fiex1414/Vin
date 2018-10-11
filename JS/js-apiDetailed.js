var id = document.URL.split('=')[1];
var item;

postList();

function postList() {
    $("#product_area").empty();
    $.ajax({
        url: 'https://winewebshop.azurewebsites.net/api/wines/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (posts) {
            item = posts;
            $("#product_details").empty().append(postBuildTableRow(posts));
        }
    });
}

function postBuildTableRow(post) {
    var ret = "<div id=\"product_price\">\n" +
        "<h1>" + post.price + "DKK</h1>\n" +
        "</div>\n" +
        "<div id=\"product_title\">\n" +
        "<h2>" + post.name + "</h2>\n" +
        "</div>\n" +
        "<div id=\"product_description\">\n" +
        "<p>" + post.description +
        "<br/>\n" +
        "</p>\n" +
        "</div>\n" +
        "<div id=\"product_type\">\n" +
        "<p>Type: " + post.type.name + "</p>\n" +
        "</div>\n" +
        "<div id=\"product_buy\">\n" +
        "<div id=\"quantity\">\n" +
        "<input type=\"number\" id='buy_number' value='1'>\n" +
        "</div>\n" +
        "<a onclick='clickBuy()'>Buy</a>\n" +
        "</div>\n" +
        "<div id=\"product_stock\">\n" +
        "<p>" + post.stock + " in stock</p>\n" +
        "</div>";
    return ret;
}

function clickBuy() {
    updateStock($("#buy_number").val());
}

function updateStock(numToBuy) {

    var stock = item.stock - numToBuy;
    console.log(stock);

    $.ajax({
        url: "https://winewebshop.azurewebsites.net/api/wines/" + id,
        type: 'PUT',
        data: JSON.stringify({
            "id" : item.id,
            "name": item.name,
            "type": item.type,
            "price": item.price,
            "description": item.description,
            "stock": stock}),
        processData: false,
        contentType: 'application/json',
        success: function (comments) {
            console.log("Yiiiaaaahhhhaaaaaa");
            postList();

        }
    });


}


