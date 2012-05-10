$(document).ready(function() {

  var round = function(num) {
    return Math.round(num - 0.5) + 0.5;
  }

  var zigzag = function(ctx, x0, y0, x1, y1, y_mid) {
    ctx.lineTo(x0, y0);
    ctx.lineTo(x0, y_mid);
    ctx.lineTo(x1, y_mid);
    ctx.lineTo(x1, y1);
  }

  var prepare_and_draw = function(container, draw_func) {
    var canvas = container.find('canvas');
    var ctx = canvas[0].getContext("2d");
    var canvas_offset = canvas.offset()
    var cx = canvas_offset.left
    var cy = canvas_offset.top

    ctx.canvas.width = container.innerWidth();
    ctx.canvas.height = container.innerHeight();

    var get_x = function(obj, w) {
      return obj.offset().left + round(w * obj.outerWidth()) - cx;
    }

    var get_y = function(obj, h) {
      return obj.offset().top + round(h * obj.outerHeight()) - cy;
    }

    var info_to_item = function(info, item) {
      zigzag(ctx,
        get_x(info, 1) + 24,
        get_y(info, 0.5),
        get_x(item, 0.5),
        get_y(item, 0.5) + 3,
        round(0.5*(get_y(info, 1) + get_y(item, 0)))
      )
    }

    var item_to_info = function(item, info) {
      zigzag(ctx,
        get_x(item, 0.5),
        get_y(item, 0.5) + 3,
        get_x(info, 0) - 24,
        get_y(info, 0.5),
        round(0.5*(get_y(item, 1) + get_y(info, 0)))
      );
    }

    draw_func(ctx, get_x, get_y, info_to_item, item_to_info);

    // draw circles around all conjunctions/prepositions
    ctx.fillStyle = '#ddd';

    container.find('.conj').each( function(index) {
      var conj = $(this);
      ctx.beginPath();
      ctx.arc(get_x(conj, 0.5), get_y(conj, 0.5) + 3, 24, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });
  }

  var on_resize = function() {

    var draw_announcement = function(ctx, get_x, get_y, info_to_item, item_to_info) {

      info1 = $('#info1')
      eugene = $('#eugene')

      ctx.beginPath();
      ctx.moveTo(get_x(info1, 0.5), get_y(info1, 0.5))
      info_to_item(info1, $('#raspy'))
      item_to_info($('#bailey'), $('#info2'))
      info_to_item($('#info2'), $('#stas'))
      item_to_info($('#andrea'), $('#info3'))
      info_to_item($('#info3'), $('#date'))
      ctx.lineTo(get_x(eugene, 0.5), get_y(eugene, 0.5) + 3)
      ctx.stroke();
    }

    var draw_registry = function(ctx, get_x, get_y, info_to_item, item_to_info) {

      info1 = $('#reg-info1')
      info2 = $('#reg-info2')

      ctx.beginPath();
      ctx.moveTo(get_x(info1, 0.5), get_y(info1, 0.5))
      info_to_item(info1, $('#equality'))
      item_to_info($('#hrc'), info2)
      ctx.lineTo(get_x(info2, 0.5), get_y(info2, 0.5))
      ctx.stroke();
    }

    var draw_hotel = function(ctx, get_x, get_y, info_to_item, item_to_info) {

      info1 = $('#hotel-info1')
      map = $('#hotel-map')

      ctx.beginPath();
      ctx.moveTo(get_x(info1, 0.5), get_y(info1, 0.5))
      info_to_item(info1, $('#rooms'))
      ctx.lineTo(get_x(map, 0.5), get_y(map, 0.5) + 3)
      ctx.stroke();
    }

    prepare_and_draw($('#announcement'), draw_announcement);
    prepare_and_draw($('#registry'), draw_registry);
    prepare_and_draw($('#hotel'), draw_hotel);
  };

  $(window).resize(on_resize);
  on_resize();

});