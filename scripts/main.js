$(document).ready(function() {

  $.getJSON("response.json", function(data) {
    var rows = [];
    $.each(data, function(key, item) {
      switch (item['type']) {
        case 'folder':
          icon = 'folder';
          break;
        case 'picture':
          icon = 'file-image';
          break;
        case 'archive':
          icon = 'file-archive';
          break;
        case 'audio':
          icon = 'file-audio';
          break;
        case 'video':
          icon = 'file-video';
          break;
        case 'document':
          icon = 'file-alt';
          break;
        default:
          icon = 'file';

      }
      var row = '<tr id="f'+item['id']+'">';
      row += '<td><span class="icon-text"><span class="icon"><i class="fas fa-'+icon+'"></i></span><span>'+item['name']+'</span></span></td>';
      row += '<td>'+item['owner']+'</td>';
      row += '<td>'+item['last-modified']+' <span class="tag is-info is-light">'+item['modified-by']+'</span></td>';
      row += '<td>'+item['file-size']+'</td>';
      row += '</tr>';
      rows.push(row);
    });
    $(rows.join("")).appendTo("table#filemanitems > tbody")

    $('table#filemanitems tbody tr').click(function() {
      if (!$(this).hasClass('is-selected')) {
        $('table#filemanitems tbody tr').removeClass('is-selected');
      }
      $(this).toggleClass('is-selected');
    });
  });

});


function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("filemanitems");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
