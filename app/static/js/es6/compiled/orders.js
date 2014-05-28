(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#order').on('change', '.menu', getMenu);
    $('#order').on('click', '.delete-row', deleteRow);
    $('#order').on('change', 'input', changeText);
    $('#order').on('blur', 'input', changeText);
    $('#order').on('change', '.dish', changeText);
    $('#add').click(addRow);
  }
  function getMenu() {
    var $__0 = this;
    var menu = $(this).val();
    ajax(("/dishes/" + menu), 'get', null, (function(response) {
      $($__0).next().empty().append(response);
    }));
  }
  function addRow() {
    var form = $('#order').children(':last').clone();
    $('#order').append(form);
  }
  function deleteRow(e) {
    if ($('#order').children().length > 2) {
      $(this).parent().remove();
    }
    e.preventDefault();
    changeText();
  }
  function changeText() {
    var total = 0;
    var items = $('#order').children().toArray();
    items.forEach(function(item) {
      var cost = $(item).children('.dish').find(':selected').attr('data-cost') * 1;
      var quantity = $(item).children('input').val() * 1;
      if (cost && quantity > 0) {
        total += (cost * quantity);
      }
    });
    total = total.toFixed(2);
    $('#total').empty().append(("Total: $" + total));
  }
})();

//# sourceMappingURL=orders.map
