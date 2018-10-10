var pageNr = 1;
var totalPages;
var filteringId = 0;

postList(pageNr);

function postList(pageNr) {
    if (pageNr <= 0) return;
    if (pageNr > totalPages) return;

    $("#product_area").empty();
    $.ajax({
        url: 'https://winewebshop.azurewebsites.net/api/wines/?curPage=' + pageNr + '&ItemPrPage=9',
        type: 'GET',
        dataType: 'json',
        success: function (posts) {
            totalPages = Math.ceil(((posts.count) / 9));
            $("#page_counter").empty().append(
                "Side " + pageNr + " af " + totalPages);
            postListSuccess(posts.wines);
        }
    });
}

function orderBy(pageNr, wineType) {

    if (pageNr <= 0) return;
    if (pageNr > totalPages) return;

    $("#product_area").empty();
    $.ajax({
        url: 'https://winewebshop.azurewebsites.net/api/wines/?curPage=' + pageNr + '&ItemPrPage=9&TypeId=' + wineType,
        type: 'GET',
        dataType: 'json',
        success: function (posts) {
            totalPages = Math.ceil(((posts.count) / 9));
            $("#page_counter").empty().append(
                "Side " + pageNr + " af " + totalPages);
            postListSuccess(posts.wines);
        }
    });
}

function postListSuccess(posts) {
    $.each(posts, function (index, post) {
        $("#product_area").append(postBuildTableRow(post));
    })
};

function postBuildTableRow(post) {
    var ret = "<div class=\"product\">\n" +
        "<a href=\"details.html?id="+post.id+"\">\n" +
        "<center>\n" +
        "<div id=\"product_img\">\n" +
        "<img src=\"img/bourgogne.jpg\" alt=\"\">\n" +
        "</div>\n" +
        "</center>\n" +
        "<div id=\"product_title\">\n" +
        "<h2>" + post.name + "</h2>\n" +
        "</div>\n" +
        "<div id=\"product_price\">\n" +
        "<p>" + post.price + " DKK</p>\n" +
        "</div>\n" +
        "</a>\n" +
        "<div id=\"product_buy\">\n" +
        "<a href=\"#\">Add to bag</a>\n" +
        "</div>\n" +
        "</div>";
    return ret;
}

var filters = [$("#red_wine"),$("#white_wine"),$("#rose_wine")];

$("#red_wine").on("click", function () {
    if (filteringId === 1) {
        postList(pageNr);
        filteringId = 0;
        $("#red_wine").removeClass("red_wine-active");
    } else if (filteringId !== 1) {
        pageNr = 1;
        orderBy(pageNr, 1);
        filteringId = 1;
        $.each(filters,function (index, filter) {
            filter.removeClass("red_wine-active")
        });
        $("#red_wine").addClass("red_wine-active");
    }
});

$("#rose_wine").on("click", function () {
    if (filteringId === 2) {
        postList(pageNr);
        filteringId = 0;
        $("#rose_wine").removeClass("red_wine-active");
    } else if (filteringId !== 2) {
        pageNr = 1;
        orderBy(pageNr, 2);
        filteringId = 2
        $.each(filters,function (index, filter) {
            filter.removeClass("red_wine-active")
        });
        $("#rose_wine").addClass("red_wine-active");
    }
});

$("#white_wine").on("click", function () {
    if (filteringId === 3) {
        postList(pageNr);
        filteringId = 0;
        $("#white_wine").removeClass("red_wine-active");
    } else if (filteringId !== 3) {
        pageNr = 1;
        orderBy(pageNr, 3);
        filteringId = 3
        $.each(filters,function (index, filter) {
            filter.removeClass("red_wine-active")
        });
        $("#white_wine").addClass("red_wine-active");
    }
});

$("#leftArrow").on("click", function (e) {
    e.preventDefault();
    if (pageNr <= 1) {
        return
    } else {
        pageNr = pageNr - 1;
        postList(pageNr);
    }
});

$("#rigthArrow").on("click", function (e) {
    e.preventDefault();
    if (pageNr > totalPages - 1) {
        return
    } else {
        pageNr = pageNr + 1;
        postList(pageNr);
    }
});