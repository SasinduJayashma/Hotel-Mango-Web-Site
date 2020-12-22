let start = new Date(); //2020-03-23

const tomorrow = new Date()


var roomPrices=new Array(3);      

var signInCheck = document.getElementById("sign-in-check");
var user_Name = document.getElementById("user-id");
var user_Doc_Id = document.getElementById("user-doc-id");
var bookingNote;
var bookingPrice;
var checkInDate;
var checkOutDate;
let selectedBooking;
let selectedRoom;
let selectedProperty;
var totalRoomPrice;
var Difference_In_Days;
var parkingSpot = false;
var roomAmmenities = false;
var plannedArrival = false;
var propertyName = ["Mango Sun", "Mango Sea", "Mango Hills"];
var roomName = ["Single", "Double", "Triple"];
var bookingyName = ["Bed & Breakfast","Half-Board", "Full-Board"];
var checkFlag = false;

document.getElementById("book-now").onclick = function() {bookNow()};
document.getElementById("user-logout").onclick = function() {userLogout()};
document.getElementById("caluclate-room-price").onclick = function() {calculateThePrice()};


function bookNow() {

    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            Swal.fire({
                width: '30%',
                padding: '1em',
                html: `<div class="card">
                <h5 class="card-header">Book Now!</h5>
                <div class="card-body">
                    <form>
                    
                        <br><label for="inputLarge" class="col-form-label">Select the property</label><br>
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-primary active">
                                <input type="radio" name="property" id="property1" value='0' checked="">Mango Sun
                            </label>
                            <label class="btn btn-primary">
                                <input type="radio" name="property" id="property2" value='1'>Mango Sea
                            </label>
                            
                            <label class="btn btn-primary">
                                <input type="radio" name="property" id="property3" value='2'>Mango Hills
                            </label>
                        </div>
                        <br><label for="inputLarge" class="col-form-label">Select the room type</label><br>
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-primary active">
                                <input type="radio" name="room" id="room1" value='0' checked="">Single
                            </label>
                            <label class="btn btn-primary">
                                <input type="radio" name="room" id="room2" value='1'>Double
                            </label>
                            
                            <label class="btn btn-primary">
                                <input type="radio" name="room" id="room3" value='2'>Triple
                            </label>
                        </div>
                        <br><label for="inputLarge" class="col-form-label">Select the booking type</label><br>
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-primary active">
                                <input type="radio" name="booking" id="booking1" value='0' checked="">Bed & Breakfast
                            </label>
                            <label class="btn btn-primary">
                                <input type="radio" name="booking" id="booking2" value='1'>Half-Board
                            </label>
                            
                            <label class="btn btn-primary">
                                <input type="radio" name="booking" id="booking3" value='2' >Full-Board
                            </label>
                        </div>
                        <br><br><label for="inputLarge" class="col-form-label">Select Dates</label><br>

                            <div class="form-group">
                                <div class="input-group date" id="datetimepicker7" data-target-input="nearest">
                                    <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker7" id="check-in-date">
                                    <div class="input-group-append" data-target="#datetimepicker7" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fa fa-calendar-alt"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group date" id="datetimepicker8" data-target-input="nearest">
                                    <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker8" id="check-out-date">
                                    <div class="input-group-append" data-target="#datetimepicker8" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fa fa-calendar-alt"></i></div>
                                    </div>
                                </div>
                            </div>

                        <div class="form-group">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input is-valid" id="radioInput1" required="">
                                <label class="custom-control-label" for="radioInput1">A parking spot</label>
                            </div>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input is-valid" id="radioInput2" required="">
                                <label class="custom-control-label" for="radioInput2">Room amenities(Free of Charge)</label>
                            </div>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input is-valid" id="radioInput3" required="">
                                <label class="custom-control-label" for="radioInput3">Planned arrival/ check-in time</label>
                            </div>
                            <label for="exampleFormControlTextarea1">Booking Notes</label><br>
                            <textarea class="form-control" id="booking-note" rows="3"></textarea>
                        </div>
                        
                        <a href="#" class="btn btn-primary" onclick="calculateThePrice()">Calculate the price</a><br><br>
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <div class="alert alert-primary" role="alert" id="booking-price">
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Continue with payment`,
            }).then((result) => {
                //--------------------------------------------------------------------------
                parkingSpot = document.getElementById("radioInput1").checked;
                roomAmmenities = document.getElementById("radioInput2").checked;
                plannedArrival = document.getElementById("radioInput3").checked;
                bookingNote = document.getElementById("booking-note");
                const room = document.querySelectorAll('input[name="room"]');
                const booking = document.querySelectorAll('input[name="booking"]');
                const property = document.querySelectorAll('input[name="property"]');
                for (const val of room) {
                    if (val.checked) {
                        selectedRoom = val.value;
                        break;
                    }
                }
                for (const val of booking) {
                    if (val.checked) {
                        selectedBooking = val.value;
                        break;
                    }
                }
                for (const val of property) {
                    if (val.checked) {
                        selectedProperty = val.value;
                        break;
                    }
                }
                //--------------------------------------------------------------------------

                if (result.value == true) {
                    Swal.fire({
                        width: '50%',
                        padding: '1em',
                        html: `<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <div class="card-body">
                                <form class="needs-validation" novalidate="">
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                            <label for="validationCustom01">Credi or Debit Card Number</label>
                                            <input type="text" class="form-control" id="card-number" placeholder="Card Number" required="">
                                            <div class="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                            <label for="validationCustom03">CVV Code</label>
                                            <input type="text" class="form-control" id="cvv-code" placeholder="CVV" required="">
                                            <div class="invalid-feedback">
                                                Please provide a valid city.
                                            </div>
                                        </div>
                                        <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                            <label for="validationCustom04">Month</label>
                                            <input type="text" class="form-control" id="month" placeholder="Month" required="">
                                            <div class="invalid-feedback">
                                                Please provide a valid state.
                                            </div>
                                        </div>
                                        <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                            <label for="validationCustom05">Year</label>
                                            <input type="text" class="form-control" id="year" placeholder="Year" required="">
                                            <div class="invalid-feedback">
                                                Please provide a valid zip.
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>`,
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: `Book Now`,
                    }).then((paymentResult) => {
                        if (paymentResult.value == true) {
                            bookingBegins(); //----- Run Method
                        } else if (paymentResult == false) {
                          Swal.fire('Payment has been canceled!', '', 'info')
                        }
                    });
                } else if (result.value ==  false) {
                  Swal.fire('Booking has been canceled!', '', 'info')
                }
            });
        } else {    
            location.replace("../pages/login.html");
            signInCheck.style.visibility = "visible";
        }
    });
  
}

async function bookingBegins() {

    var DocRef = db.collection("mango-hotel-rooms/"+propertyName[selectedProperty]+"/booking-logs");
    var UserRef = db.collection("mango-customers");

    var user = firebase.auth().currentUser;
    if (user) {
        //Check for whether user has already submitted.
        await UserRef.where("isBooked", "==", true)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if (doc.exists) {
                    checkFlag = true;
                    Swal.fire(
                        "You already have booked a room!",
                        'You can only booked one room at once! Next Time Yo!',
                        'error'
                    )
                } else {
                    //Check for whether user has already submitted.
                    DocRef.where("check_in", "<=", new Date(checkInDate.value))
                    .where("check_out", "<=", new Date(checkOutDate.value))
                    .where("room_type", "==", roomName[selectedRoom])
                    .where("booking_type", "==", bookingyName[selectedBooking])
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            if (doc.exists) {
                                checkFlag = true;
                                Swal.fire(
                                    "Someone else have booked already!!",
                                    'Please choose another date or room type',
                                    'error'
                                )
                            }
                        });
                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });
                }
            });
        }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });

        console.log("herererer1" + checkFlag);


        if(checkFlag==false){
            //Adding to the firestore database
            console.log("herererer2");
            DocRef.add({
                user_id: user.uid,
                room_type: roomName[selectedRoom],
                booking_type: bookingyName[selectedBooking],
                booking_note: bookingNote.value,
                room_price: totalRoomPrice,
                room_amenities: roomAmmenities,
                planned_time: plannedArrival,
                payment_success: true,
                payment_method: "CREDIT/DEBIT",
                parking_spot: parkingSpot,
                days_of_staying: Difference_In_Days,
                check_in: new Date(checkInDate.value),
                check_out: new Date(checkOutDate.value)
            })
            .then(function(docRef) {
                Swal.fire('Payment Completed!', '', 'success')
                return UserRef.doc(user.uid).update({
                    isBooked: true
                })
                .then(function() {
                   
                });
            })
        }

    } else {
    }
}

function userLogout() {
    console.log("logout");
    firebase.auth().signOut();
    location.replace("../index.html");
}

function retrieveRoomPrices() {
    for (i=0; i <3; i++)          
    roomPrices[i]=new Array(3)  

    //$15.00 $24.00 $30.00
    roomPrices[0][0]=5.00;
    roomPrices[0][1]=24.00;
    roomPrices[0][2]=30.00;

    //$22.00 $34.00 $38.00
    roomPrices[1][0]=22.00;
    roomPrices[1][1]=34.00;
    roomPrices[1][2]=38.00;

    //$27.00 $39.00 $45.00
    roomPrices[2][0]=27.00;
    roomPrices[2][1]=39.00;
    roomPrices[2][2]=45.00;
}

function calculateThePrice() {
    retrieveRoomPrices();
    const room = document.querySelectorAll('input[name="room"]');
    const booking = document.querySelectorAll('input[name="booking"]');
    checkInDate = document.getElementById('check-in-date');
    checkOutDate = document.getElementById('check-out-date');
    
    
    for (const val of room) {
        if (val.checked) {
            selectedRoom = val.value;
            break;
        }
    }
    for (const val of booking) {
        if (val.checked) {
            selectedBooking = val.value;
            break;
        }
    }

    let enteredcheckInDate = new Date(checkInDate.value);
    let enteredcheckOutDate = new Date(checkOutDate.value);

    var Difference_In_Time = enteredcheckInDate.getTime() - enteredcheckOutDate.getTime(); 
    Difference_In_Days = Math.round(Math.abs(Difference_In_Time / (1000 * 3600 * 24))); 

    console.log(Math.round(Math.abs(Difference_In_Days)));
    totalRoomPrice = Difference_In_Days * roomPrices[selectedRoom][selectedBooking];

    bookingPrice = document.getElementById("booking-price");
    bookingPrice.innerHTML = "$."+totalRoomPrice+".00";
     
}

function retrieveRoomDetails() {
    db.collection("main_food_repo")
        .onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(docMain) {
                db.collection("main_food_repo/" + docMain.id + "/who_has_it").where("isAvailable", "==", "'true'")
                    .onSnapshot(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            if (doc.id === qless_id) {
                                var isUnique = doc.data().isUniqe;
                                if (isUnique == true) {
                                    renderAllTheProducts(docMain, "bg-danger");
                                } else {
                                    renderAllTheProducts(docMain, "");
                                }
                            }
                        });
                    });
            });
        });
}
