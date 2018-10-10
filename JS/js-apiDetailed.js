var id = document.URL.split('=')[1];
postList()

function postList() {
    $("#product_area").empty();
    $.ajax({
        url: 'https://winewebshop.azurewebsites.net/api/wines/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (posts) {
            $("#product_details").empty().append(postBuildTableRow(posts));
        }
    });
}

function postBuildTableRow(post) {
    var ret = "<div id=\"product_price\">\n" +
        "<h1>" + post.price + " DKK</h1>\n" +
        "</div>\n" +
        "<div id=\"product_title\">\n" +
        "<h2>" + post.name + "</h2>\n" +
        "</div>\n" +
        "<div id=\"product_description\">\n" +
        "<p>" + post.description +
        "<br/>\n" +
        "</p>\n" +
        "</div>\n" +
        "\n" +
        "<div id=\"product_type\">\n" +
        "<p>Type: " + post.type.name + "</p>\n" +
        "</div>\n" +
        "\n" +
        "<div id=\"product_year\">\n" +
        "<p>Year: 1985</p>\n" +
        "</div>\n" +
        "\n" +
        "<div id=\"product_buy\">\n" +
        "<a href=\"#\">Add to bag</a>\n" +
        "</div>\n" +
        "<div id=\"product_stock\">\n" +
        "<p>8 in stock</p>\n" +
        "</div>";
    return ret;
}