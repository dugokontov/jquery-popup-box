(function ($) {
  $(function () {
    $("#alert").click(function () {
      $.alert("This is simple alert message", "Title");
    });

    $("#prompt").click(function () {
      $.prompt("Enter your name", "John")
        .done(function (name) {
          $.alert("Hi " + name, "Greeting");
        })
        .fail(function () {
          $.alert("You didn't want to input your name", "See you next time");
        });
    });

    $("#confirm").click(function () {
      $.confirm("Confirm this action", "Please make choice")
        .done(function () {
          $.alert("You said OK", "Yupiii");
        })
        .fail(function () {
          $.alert("You canceled!", "Noooo");
        })
    });

    $("#actions button").click(function (events) {
      $("#scripts pre").hide();
      $("#code-for-" + events.target.id).show();
    });

    $("#scripts pre").hide();
  });
}(jQuery));