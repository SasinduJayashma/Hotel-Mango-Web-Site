jQuery(document).ready(function($) {
    'use strict';

    /* Calender jQuery **/

    if ($("#datetimepicker7").length) {
        $(function() {
            $('#datetimepicker7').datetimepicker({
                icons: {
                    date: "fa fa-calendar-alt",
                    up: "fa fa-arrow-up",
                    down: "fa fa-arrow-down"
                }
            });
            $('#datetimepicker8').datetimepicker({
                useCurrent: false,
                icons: {
                    date: "fa fa-calendar-alt",
                    up: "fa fa-arrow-up",
                    down: "fa fa-arrow-down"
                }
            });
            $("#datetimepicker7").on("change.datetimepicker", function(e) {
                $('#datetimepicker8').datetimepicker('minDate', e.date);
                // date = new Date(doc.data().invoice_date.seconds * 1000),
                
                
            });
            $("#datetimepicker8").on("change.datetimepicker", function(e) {
                $('#datetimepicker7').datetimepicker('maxDate', e.date);
                console.log(e.date);
            });
        });
    }

});