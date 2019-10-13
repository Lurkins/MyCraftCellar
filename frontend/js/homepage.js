// THIS CODE RUNS IN THE BROWSER

var beerAPIurl = "https://mycraftcellar.herokuapp.com/beer"
var hasContacted = false;
//READ
$(document).ready(function(){
    
//READ (GET)   
    $.ajax({
        'url': beerAPIurl,
        'method': 'GET'
    })
    .done(function(dataObj){
        $('.beer-ul').empty();
        $('#listLoader').hide();
        dataObj.map(function(beer){
            $('.beer-ul').append(
                `<li class="list-group-item beer-list-items" data-id=${beer._id}>
                    <div class="beer-info-box">
                        <div class="beer-brand">${beer.brand}</div><div class="beer-name">${beer.description}</div>
                        <div class="year-box font-weight-light">${beer.year}</div>
                        <div class="quantity-box"><i class="fas fa-beer text-warning beer-qty-icon mr-3"></i><i class="fas fa-times mr-3"></i>${beer.quantity}</div>
                    </div>  
                    <div class="btn btn-warning p-2 beerMe" data-toggle="modal" data-target="#exampleModalCenter">
                        <div class="beer-me-text">Select Beer</div>
                    </div>
                </li>`
            )
        })
    })
    .fail(function(errorObj){
        console.error("API call failed with error " + JSON.stringify(errorObj) );
        return false; 
    })
})

//Sort by age
$('.sort-age').on('click', function() {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    $.ajax({
        'url': beerAPIurl + '/age',
        'method': 'GET',
        beforeSend: function() {
            $('.list-group').hide();
            $('#listLoader').show();
         }
    })
    .done(function(dataObj){
        $('.beer-ul').empty();
        $('.list-group').show();
        $('#listLoader').hide();
        dataObj.map(function(beer){
            $('.beer-ul').append(
                `<li class="list-group-item beer-list-items" data-id=${beer._id}>
                    <div class="beer-info-box">
                        <div class="beer-brand">${beer.brand}</div><div class="beer-name">${beer.description}</div>
                        <div class="year-box font-weight-light">${beer.year}</div>
                        <div class="quantity-box"><i class="fas fa-beer text-warning beer-qty-icon mr-3"></i><i class="fas fa-times mr-3"></i>${beer.quantity}</div>
                    </div>  
                    <div class="btn btn-warning p-2 beerMe" data-toggle="modal" data-target="#exampleModalCenter">
                        <div class="beer-me-text">Select Beer</div>
                    </div>
                </li>`
            )
        })
    })
    .fail(function(errorObj){
        console.error("API call failed with error " + JSON.stringify(errorObj) );
        return false; 
    })
});

//Sort by name
$('.sort-name').on('click', function() {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    $.ajax({
        'url': beerAPIurl + '/name',
        'method': 'GET',
        beforeSend: function() {
            $('.list-group').hide();
            $('#listLoader').show();
        }
    })
    .done(function(dataObj){
        $('.beer-ul').empty();
        $('.list-group').show();
        $('#listLoader').hide();
        dataObj.map(function(beer){
            $('.beer-ul').append(
                `<li class="list-group-item beer-list-items" data-id=${beer._id}>
                    <div class="beer-info-box">
                        <div class="beer-brand">${beer.brand}</div><div class="beer-name">${beer.description}</div>
                        <div class="year-box font-weight-light">${beer.year}</div>
                        <div class="quantity-box"><i class="fas fa-beer text-warning beer-qty-icon mr-3"></i><i class="fas fa-times mr-3"></i>${beer.quantity}</div>
                    </div>  
                    <div class="btn btn-warning p-2 beerMe" data-toggle="modal" data-target="#exampleModalCenter">
                        <div class="beer-me-text">Select Beer</div>
                    </div>
                </li>`
            )
        })
    })
    .fail(function(errorObj){
        console.error("API call failed with error " + JSON.stringify(errorObj) );
        return false; 
    })
});

//Sort by brand
$('.sort-brand').on('click', function() {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    $.ajax({
        'url': beerAPIurl + '/brand',
        'method': 'GET',
        beforeSend: function() {
            $('.list-group').hide();
            $('#listLoader').show();
         }
    })
    .done(function(dataObj){
        $('.beer-ul').empty();
        $('.list-group').show();
        $('#listLoader').hide();
        dataObj.map(function(beer){
            $('.beer-ul').append(
                `<li class="list-group-item beer-list-items" data-id=${beer._id}>
                    <div class="beer-info-box">
                        <div class="beer-brand">${beer.brand}</div><div class="beer-name">${beer.description}</div>
                        <div class="year-box font-weight-light">${beer.year}</div>
                        <div class="quantity-box"><i class="fas fa-beer text-warning beer-qty-icon mr-3"></i><i class="fas fa-times mr-3"></i>${beer.quantity}</div>
                    </div>  
                    <div class="btn btn-warning p-2 beerMe" data-toggle="modal" data-target="#exampleModalCenter">
                        <div class="beer-me-text">Select Beer</div>
                    </div>
                </li>`
            )
        })
    })
    .fail(function(errorObj){
        console.error("API call failed with error " + JSON.stringify(errorObj) );
        return false; 
    })
});

//Sort by quantity
$('.sort-qty').on('click', function() {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    $.ajax({
        'url': beerAPIurl + '/quantity',
        'method': 'GET',
        beforeSend: function() {
            $('.list-group').hide();
            $('#listLoader').show();
         }
    })
    .done(function(dataObj){
        $('.beer-ul').empty();
        $('.list-group').show();
        $('#listLoader').hide();
        dataObj.map(function(beer){
            $('.beer-ul').append(
                `<li class="list-group-item beer-list-items" data-id=${beer._id}>
                    <div class="beer-info-box">
                        <div class="beer-brand">${beer.brand}</div><div class="beer-name">${beer.description}</div>
                        <div class="year-box font-weight-light">${beer.year}</div>
                        <div class="quantity-box"><i class="fas fa-beer text-warning beer-qty-icon mr-3"></i><i class="fas fa-times mr-3"></i>${beer.quantity}</div>
                    </div>  
                    <div class="btn btn-warning p-2 beerMe" data-toggle="modal" data-target="#exampleModalCenter">
                        <div class="beer-me-text">Select Beer</div>
                    </div>
                </li>`
            )
        })
    })
    .fail(function(errorObj){
        console.error("API call failed with error " + JSON.stringify(errorObj) );
        return false; 
    })
});
  
//Beer me
$('ul').on('click', '.beerMe', function() { 
    if(hasContacted) {
        var cutOffMsg = "<div class='alert alert-warning'><h3>You're cut off!</h3>Not really, but please be respectful. If you want to message me about another beer, refresh the page to send a new message.</div>"
        $('.modal-body').html(cutOffMsg);
    }    
    var thisBeerBrand = $(this.closest('li')).find(".beer-brand").text(); 
    var thisBeerDescription = $(this.closest('li')).find(".beer-name").text(); 
    var thisBeerYear = $(this.closest('li')).find(".year-box").text(); 
    var thisBeerMsg = `${thisBeerYear} ${thisBeerBrand} ${thisBeerDescription}` 
    var emailBeerInfo = `${thisBeerYear} ${thisBeerBrand} ${thisBeerDescription}`
    $('#contactForm').append(`<input id="hidden-input" type="hidden" name="beer" value="${emailBeerInfo}"/>`);
    $('#modalHeadline').text(thisBeerMsg)  
    $('#contactFormModal').modal('show');
});

// Remove the hidden beer input when closing the contact form
$('#contactFormModal').on('hidden.bs.modal', function(){
    $('#hidden-input').remove();
});

//submit contact form
$('#contactForm').on('submit', function(event) {
    event.preventDefault();
    if ($('#contactForm')[0].checkValidity() === false) {
        event.stopPropagation();
    } else {
        var data = $('#contactForm').serialize();
        var loader = '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Sending...'
        $.ajax({
            'url':'/send',
            method: 'POST',
            data: data,
            beforeSend: function() {
                $('#contactformSubmit').html(loader);
            },
            success: function(res) {
                var messageAlert = 'alert-' + res.type;
                var messageText = res.msg;
                var alertBox = '<div class="alert ' + messageAlert + '">' + messageText + '</div>';
                if (messageAlert && messageText) {
                    $('#alert-box').html(alertBox);  
                }
                $('#contactformSubmit').hide();
                $('#contactForm')[0].reset();
                $('.msg-form-entry').prop("disabled", true);
                hasContacted = true;
            },
            fail: function(error, res) {
                var messageAlert = 'alert-' + res.type;
                var messageText = res.msg;
                var alertBox = '<div class="alert ' + messageAlert + '">' + messageText + '</div>';
                if (messageAlert && messageText) {
                    $('#modalHeadline').html(alertBox);  
                }
                console.log('There was an error', error);
            }
        })
    }
    $('#contactForm').addClass('was-validated'); 
});