$(document).ready(function () {

    var apiData = {
        url: 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=leeds',
        jsonData: {}
    }, selectors = {
        scroll: document.getElementById("scroll"),
        taba: document.getElementById("taba"),
        detailsInfo: document.getElementById("detailsInfo"),
        footer: document.getElementById("footer"),

        priceInfo: document.getElementById("priceInfo"),
        titleInfo: document.getElementById("titleInfo"),
        bigImg: document.getElementById("bigImg"),
        summaryInfo: document.getElementById("summaryInfo"),
        roomsInfo: document.getElementById("roomsInfo"),
    };

    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: apiData.url,
        success: function (response) {
            apiData.jsonData = response;
            makeInfoCard();
        }
    });

    function makeInfoCard() {
        taba.innerHTML = apiData.jsonData.response.listings.length + " of " + apiData.jsonData.response.total_results + " matches";

        for (i = 0; i < apiData.jsonData.response.listings.length; i += 1) {

            selectors.newCard = document.createElement("div");
            selectors.newCard.className = "card";
            selectors.newCard.setAttribute('id', i);
            selectors.scroll.appendChild(selectors.newCard);

            var newThumb = document.createElement("img");
            newThumb.className = "picture";
            newThumb.src = apiData.jsonData.response.listings[i].thumb_url;
            selectors.newCard.appendChild(newThumb);

            var newPrice = document.createElement("p");
            newPrice.className = "price";
            newPrice.innerHTML = apiData.jsonData.response.listings[i].price_formatted;
            selectors.newCard.appendChild(newPrice);

            var newTitle = document.createElement("span");
            newTitle.className = "info";
            newTitle.innerHTML = apiData.jsonData.response.listings[i].title;
            selectors.newCard.appendChild(newTitle);

            selectors.newCard.addEventListener("click", function (event) {
                selectors.scroll.style.display = "none";
                var elemNumber = event.currentTarget.getAttribute('id');
                makeDetailsInfo(elemNumber);
            });
        }
    }

    function makeDetailsInfo(i) {
        i = +i;
        taba.innerHTML = "<strong>Property details</strong>";
        detailsInfo.style.display = "block";
        footer.style.display = "block";

        priceInfo.innerHTML = apiData.jsonData.response.listings[i].price_formatted;
        titleInfo.innerHTML = apiData.jsonData.response.listings[i].title;
        bigImg.src = apiData.jsonData.response.listings[i].img_url;
        if (apiData.jsonData.response.listings[i].bedroom_number > 1) {
            var bedroomString = " bedrooms, ";
        } else {
            bedroomString = " bedroom, ";
        }
        if (apiData.jsonData.response.listings[i].bathroom_number > 1) {
            var bathroomString = " bathrooms.";
        } else {
            bathroomString = " bathroom.";
        }
        roomsInfo.innerHTML = apiData.jsonData.response.listings[i].bedroom_number + bedroomString + apiData.jsonData.response.listings[i].bathroom_number + bathroomString;
        summaryInfo.innerHTML = apiData.jsonData.response.listings[i].summary;
    }

    footer.addEventListener("click", function (event) {
        detailsInfo.style.display = "none";
        footer.style.display = "none";
        selectors.scroll.style.display = "block";
        taba.innerHTML = apiData.jsonData.response.listings.length + " of " + apiData.jsonData.response.total_results + " matches";
    });

});
