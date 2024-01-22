$(document).ready(function() {

    $("#search_btn").click(function() {
            $(".invalid-feedback").hide();

            if ($("#address_input").val()) {
                fetchlocation($("#address_input").val(), "data");

            } else {
                $(".invalid-feedback").show().html("Please enter address.")

            }

        })
        //alert("here");

});

function fetchlocation(address, target) {

    let fetchRes = fetch("http://localhost:3000/weather?location=" + address);
    // FetchRes is the promise to resolve
    // it by using.then() method
    fetchRes.then(res =>
        res.json()).then(d => {
        if (d.status == "0") {
            console.log(d.error.error.message);
            var result = d.error.error.message;
            $(".invalid-feedback").show().html(result);

        } else {
            console.log(d)
            $(".invalid-feedback").hide();
            var result = d.location.name + " " + d.location.region + " Temprature" + d.current.temp_c + ", humidity" + d.current.humidity;
            $("#" + target).html(result);
        }



    })



}