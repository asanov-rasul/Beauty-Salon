const modalOpenBtn = document.querySelector('#btn-open-modal'),
      modalCloseBtn = document.querySelectorAll('.closemodal'),
      modal = document.querySelector('#modalwindow'),
      modalOne = document.querySelector('#modal-one'),
      modalTwo = document.querySelector('#modal-two'),
      modalThree = document.querySelector('#modal-three'),
      modalEnd = document.querySelectorAll('.modal-btn-end'),
      modalNext = document.querySelectorAll('.modal-btn-next'),
      modalSend = document.querySelector('.modal-btn-send'),
      myList = document.querySelector('#myList'),
      listClock = document.querySelector('.modal-time-list'),

      body = document.querySelector('body');

modalOpenBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  modalOne.style.display = 'block';
  body.style.overflow = 'hidden';
})

function modalClose() {
  modal.style.display = 'none';
  modalOne.style.display = 'none';
  modalTwo.style.display = 'none';
  modalThree.style.display = 'none';
  body.style.overflow = 'scroll';
}

modalCloseBtn.forEach(item => {
  item.addEventListener('click', () => {
    modalClose();
  })
})

modalEnd.forEach(item => {
  item.addEventListener('click', () => {
    if (modalOne.style.display == 'block') {
      modalClose();
    } else if (modalTwo.style.display == 'block') {
      modalTwo.style.display = 'none';
      modalOne.style.display = 'block';
    } else if (modalThree.style.display == 'block') {
      modalThree.style.display = 'none';
      modalTwo.style.display = 'block';
      modalOne.style.display = 'none';
      modalNext.forEach(i => {
        i.style.display = 'block'
      })
      modalSend.style.display = 'none';
    }
  })
})

modalNext.forEach(item => {
  item.addEventListener('click', () => {
    if (modalOne.style.display == 'block') {
      modalOne.style.display = 'none';
      modalTwo.style.display = 'block';
    } else if (modalTwo.style.display == 'block') {
      modalTwo.style.display = 'none';
      modalOne.style.display = 'none';
      modalThree.style.display = 'block';
      modalNext.forEach(i => {
        i.style.display = 'none'
      })
      modalSend.style.display = 'block';
    } else if (modalThree.style.display == 'block') {
      closeModal();
    }
  })
})

myList.addEventListener('click', (event) => {
  if(event.target.classList.contains('list-group-item')) {
    event.target.classList.toggle('active-li')
  }
})

listClock.addEventListener('click', (event) => {
  if(event.target.classList.contains('modal-time-item')) {
    event.target.classList.toggle('active-li')
  }
})




  var Cal = function(divId) {
  //Сохраняем идентификатор div
  this.divId = divId;
  // Дни недели с понедельника
  this.DaysOfWeek = [
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб',
    'Вс'
  ];
  // Месяцы начиная с января
  this.Months =['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  //Устанавливаем текущий месяц, год
  var d = new Date();
  this.currMonth = d.getMonth();
  this.currYear = d.getFullYear();
  this.currDay = d.getDate();
};
// Переход к следующему месяцу
Cal.prototype.nextMonth = function() {
  if ( this.currMonth == 11 ) {
    this.currMonth = 0;
    this.currYear = this.currYear + 1;
  }
  else {
    this.currMonth = this.currMonth + 1;
  }
  this.showcurr();
};
// Переход к предыдущему месяцу
Cal.prototype.previousMonth = function() {
  if ( this.currMonth == 0 ) {
    this.currMonth = 11;
    this.currYear = this.currYear - 1;
  }
  else {
    this.currMonth = this.currMonth - 1;
  }
  this.showcurr();
};
// Показать текущий месяц
Cal.prototype.showcurr = function() {
  this.showMonth(this.currYear, this.currMonth);
};
// Показать месяц (год, месяц)
Cal.prototype.showMonth = function(y, m) {
  var d = new Date()
  // Первый день недели в выбранном месяце 
  , firstDayOfMonth = new Date(y, m, 7).getDay()
  // Последний день выбранного месяца
  , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
  // Последний день предыдущего месяца
  , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();
  var html = '<table>';
  // Запись выбранного месяца и года
  html += '<thead><tr>';
  html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
  html += '</tr></thead>';
  // заголовок дней недели
  html += '<tr class="days">';
  for(var i=0; i < this.DaysOfWeek.length;i++) {
    html += '<td>' + this.DaysOfWeek[i] + '</td>';
  }
  html += '</tr>';
  // Записываем дни
  var i=1;
  do {
    var dow = new Date(y, m, i).getDay();
    // Начать новую строку в понедельник
    if ( dow == 1 ) {
      html += '<tr>';
    }
    // Если первый день недели не понедельник показать последние дни предыдущего месяца
    else if ( i == 1 ) {
      html += '<tr>';
      var k = lastDayOfLastMonth - firstDayOfMonth+1;
      for(var j=0; j < firstDayOfMonth; j++) {
        html += '<td class="not-current">' + k + '</td>';
        k++;
      }
    }
    // Записываем текущий день в цикл
    var chk = new Date();
    var chkY = chk.getFullYear();
    var chkM = chk.getMonth();
    if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
      html += '<td class="today">' + i + '</td>';
    } else {
      html += '<td class="normal">' + i + '</td>';
    }
    // закрыть строку в воскресенье
    if ( dow == 0 ) {
      html += '</tr>';
    }
    // Если последний день месяца не воскресенье, показать первые дни следующего месяца
    else if ( i == lastDateOfMonth ) {
      var k=1;
      for(dow; dow < 7; dow++) {
        html += '<td class="not-current">' + k + '</td>';
        k++;
      }
    }
    i++;
  }while(i <= lastDateOfMonth);
  // Конец таблицы
  html += '</table>';
  // Записываем HTML в div
  document.getElementById(this.divId).innerHTML = html;
};
// При загрузке окна
window.onload = function() {
  // Начать календарь
  var c = new Cal("divCal");			
  c.showcurr();
  // Привязываем кнопки «Следующий» и «Предыдущий»
  getId('btnNext').onclick = function() {
    c.nextMonth();
  };
  getId('btnPrev').onclick = function() {
    c.previousMonth();
  };
}
// Получить элемент по id
function getId(id) {
  return document.getElementById(id);
}


const burgerBtn = document.querySelector('.navbar-toggler'),
      burgerMenu = document.querySelector('.navbar-nav');

burgerBtn.addEventListener('click', () => {
  burgerMenu.classList.toggle('none')
})
