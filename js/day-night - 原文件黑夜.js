  // 在这里修改 isDark 变量过期的时间
  var isDarkLiveHours = 1;

  function setCookie(name, value, hoursToLive) {
    var cookie = name + "=" + encodeURIComponent(value);
    
    if (typeof hoursToLive === "number") {
      cookie += ";path=/;max-age=" + (hoursToLive*60*60);
    }

    document.cookie = cookie;
  }

  function getCookie(name) {
    // 拆分 cookie 字符串
    var cookieArr = document.cookie.split(";");
   
    // 循环遍历数组元素
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
       
        /* 删除 cookie 名称开头的空白并将其与给定字符串进行比较 */
        if(name == cookiePair[0].trim()) {
            // 解码cookie值并返回
            return decodeURIComponent(cookiePair[1]);
        }
    }
    // 如果未找到，则返回null
    return null;
  }

  function switchNightMode() {
    $('<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>').appendTo($('body')),
      setTimeout(function () {
        $('body').hasClass('DarkMode') 
        ? ($('body').removeClass('DarkMode'), localStorage.setItem('isDark', '0'), $('#sum-moon-icon').removeClass("fa-sun").addClass('fa-moon')) 
        : ($('body').addClass('DarkMode'), localStorage.setItem('isDark', '1'), $('#sum-moon-icon').addClass("fa-sun").removeClass('fa-moon')),
          
        setTimeout(function () {
          $('.Cuteen_DarkSky').fadeOut(1e3, function () {
            $(this).remove()
          })
        }, 2e3);
      });
  }

  //黑夜模式自动开启功能（首次加载）
  setTimeout(function () {
    if (localStorage.getItem('isDark') == null) {
      if ((new Date().getHours() >= 22 || new Date().getHours() < 6) && !$('body').hasClass('DarkMode')) {
        $('body').addClass('DarkMode');	
        localStorage.setItem('isDark', '1');
        $('#sum-moon-icon').addClass("fa-sun").removeClass('fa-moon');
      }
    } else {
      /* 模式判断 */
      if (localStorage.getItem('isDark') === '1') {
        document.body.classList.add('DarkMode');
        $('#sum-moon-icon').addClass("fa-sun").removeClass('fa-moon');
      } else {
        document.body.classList.remove('DarkMode');
        $('#sum-moon-icon').removeClass("fa-sun").addClass('fa-moon');
      }
    }
  }, 0);

    /*提醒开启功能*/
  setTimeout(function () {
      if (
          (new Date().getHours() >= 21 || new Date().getHours() < 7) &&
          !$("body").hasClass("DarkMode")
      ) {
          let toastHTML =
              '<span style="color:#97b8b2;border-radius: 10px;>' +
              '<i class="fa fa-bell" aria-hidden="true"></i>晚上使用深色模式阅读更好哦。(ﾟ▽ﾟ)/</span>';
          M.toast({ html: toastHTML });
      }
  }, 2000);
