// THIS CODE RUNS IN THE BROWSER

var beerAPIurl = "https://mycraftcellar.herokuapp.com/beer"

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
                    <div class="btn-group-vertical h-100">
                        <div class="btn btn-warning addQty p-2"><i class="fas fa-plus-circle addRemove"></i></div>
                        <div class="btn btn-warning removeQty p-2"><i class="fas fa-minus-circle addRemove"></i></div>
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
                    <div class="btn-group-vertical h-100">
                        <div class="btn btn-warning addQty p-2"><i class="fas fa-plus-circle addRemove"></i></div>
                        <div class="btn btn-warning removeQty p-2"><i class="fas fa-minus-circle addRemove"></i></div>
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
                    <div class="btn-group-vertical h-100">
                        <div class="btn btn-warning addQty p-2"><i class="fas fa-plus-circle addRemove"></i></div>
                        <div class="btn btn-warning removeQty p-2"><i class="fas fa-minus-circle addRemove"></i></div>
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
                    <div class="btn-group-vertical h-100">
                        <div class="btn btn-warning addQty p-2"><i class="fas fa-plus-circle addRemove"></i></div>
                        <div class="btn btn-warning removeQty p-2"><i class="fas fa-minus-circle addRemove"></i></div>
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
                    <div class="btn-group-vertical h-100">
                        <div class="btn btn-warning addQty p-2"><i class="fas fa-plus-circle addRemove"></i></div>
                        <div class="btn btn-warning removeQty p-2"><i class="fas fa-minus-circle addRemove"></i></div>
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

// CREATE (POST)
$('#beer-form').submit(function(event) {    
    event.preventDefault();
    if ($('#beer-form')[0].checkValidity() === false) {
        event.stopPropagation();
    } else {
        // var loader = '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Adding Beer...'
        var beerItem = {
            brand: $('#brandInput').val(),
            description: $('#beerInput').val(),
            year: $('#yearInput').val(),   
        }
        $.ajax({
            'url': beerAPIurl,
            'method': 'POST',
            data: beerItem,
            // beforeSend: function() {
            //     $('#addBeerSubmit').html(loader);
            // },
            success: function(newBeer) {
                console.log('inside success');
                $('.beer-ul').prepend(
                    `<li class="list-group-item beer-list-items" data-id="${newBeer._id}">
                        <div class="beer-info-box">
                            <div class="beer-brand">${newBeer.brand}</div><div class="beer-name">${newBeer.description}</div>
                            <div class="year-box font-weight-light">${newBeer.year}</div>
                            <div class="quantity-box"><i class="fas fa-beer text-warning beer-qty-icon mr-3"></i><i class="fas fa-times mr-3"></i>${newBeer.quantity}</div>
                        </div>   
                        <div class="btn-group-vertical h-100">
                            <div class="btn btn-warning addQty p-2"><i class="fas fa-plus-circle addRemove"></i></div>
                            <div class="btn btn-warning removeQty p-2"><i class="fas fa-minus-circle addRemove"></i></div>
                        </div>
                    </li>`
                );
                $('#beer-form').removeClass('was-validated');
                $('#add-beer-alert').html('<div class="alert alert-success alert-dismissible fade show" role="alert">Beer Added!  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
                $('input').val("");
            },
            fail: function(errorObj) {
                console.error("API call failed with error " + JSON.stringify(errorObj) );
                return false; 
            }
        })
    }
    $('#beer-form').addClass('was-validated'); 
});

// UPDATE (PUT)
$('.beer-ul').on('click', '.addQty', function() {
    var self = this;
    var thisBeerId = $(this.closest('li')).data("id");        
    $.ajax({
        'url': beerAPIurl+'/'+thisBeerId,
        'method': 'PUT'
    })
    .done(function(beer){ 
        $(self.closest('li')).replaceWith(
            `<li class="list-group-item beer-list-items" data-id=${beer._id}>
                <div class="beer-info-box">
                    <div class="beer-brand">${beer.brand}</div><div class="beer-name">${beer.description}</div>
                    <div class="year-box font-weight-light">${beer.year}</div>
                    <div class="quantity-box"><i class="fas fa-beer text-warning beer-qty-icon mr-3"></i><i class="fas fa-times mr-3"></i>${beer.quantity}</div>
                </div>   
                <div class="btn-group-vertical h-100">
                    <div class="btn btn-warning addQty p-2"><i class="fas fa-plus-circle addRemove"></i></div>
                    <div class="btn btn-warning removeQty p-2"><i class="fas fa-minus-circle addRemove"></i></div>
                </div>
            </li>`
        )
    })
});
  
// DELETE (DELETE)
$('.beer-ul').on('click', '.removeQty', function(event) {
    event.stopPropagation();
    var self = this;
    var thisBeerId = $(this.closest('li')).data("id"); 
    var numOfBeer = $(this.closest('li')).find(".quantity-box").text();
    if(numOfBeer === '1'){
        $('#confirm-modal').modal('show');
        $('#confirmed').on('click', function() {
            deleteBeer();
            $('#confirm-modal').modal('hide');
        })
    } else {
        deleteBeer();
    }
    function deleteBeer() {
        $.ajax({
            'url': beerAPIurl+'/'+thisBeerId,
            'method': 'DELETE'
        })
        .done(function(beer){
            if(beer){
                $(self.closest('li')).replaceWith(
                    `<li class="list-group-item beer-list-items" data-id=${beer._id}>
                        <div class="beer-info-box">
                            <div class="beer-brand">${beer.brand}</div>
                            <div class="beer-name">${beer.description}</div>
                            <div class="year-box font-weight-light">${beer.year}</div>
                            <div class="quantity-box"><i class="fas fa-beer text-warning beer-qty-icon mr-3"></i><i class="fas fa-times mr-3"></i>${beer.quantity}</div>
                        </div>   
                        <div class="btn-group-vertical h-100">
                            <div class="btn btn-warning addQty p-2"><i class="fas fa-plus-circle addRemove"></i></div>
                            <div class="btn btn-warning removeQty p-2"><i class="fas fa-minus-circle addRemove"></i></div>
                        </div>
                    </li>`
                );
            } else {
                $(self.closest('li')).remove();
            }
        })
    }
});
  
