//// ------------------------  Load :: Header & Footer  ------------------------ ////
$('#header').load('/html/header.html');

//// --------------------------------  Modal & Cookies -------------------------------- ////
const modal = $("#Modal");

modal.click(function(){
  $(this).css('display','none');
});

checkCookie('JazzFestival');

//쿠키생성
function setCookie(name, value, day){
  let date = new Date();
  let myCookie = '';
  date.setDate(date.getDate() + day);
  myCookie += name + '=' + value + ';';
  myCookie += 'Expires=' + date.toUTCString();
  document.cookie = myCookie;
}
setCookie('JazzFestival','Main', 1);

//쿠키확인
function checkCookie(name){
  let cookies = document.cookie.split(';');
  let visited = false;
  for(var i in cookies){
    if(cookies[i].indexOf(name) > -1){
      visited = true;
    }
  }
  if(visited){
    modal.css('display','none');
  }else{
    modal.css('display','block');
  }

}



//// --------------------------------  HEADER  -------------------------------- ////
const header = $("header"),
      headerBtn = header.find(".btn"),
      headerBtnBar = headerBtn.find("span"),
      headerNav = header.find("nav"),
      headerAnchor = header.find("a"),
      subMenu = $(".subMenu");

headerBtn.click(function () {
  headerNav.add(headerBtnBar).toggleClass("toggle");
});

headerAnchor.on("focus", function() {
  subMenu.addClass("focus");
});
headerAnchor.on("blur", function() {
  subMenu.removeClass("focus");
});


//// --------------------------------  MainSlide  -------------------------------- ////
const slideContainer = $(".mainSlide-Container"),
      slideBox = $(".mainSlide-Box"),
      slides = $(".mainSlide-Box > div"),      
      totalSlides = slides.length,
      swipeThresholdX = 40,
      swipeThresholdY = 40;
let   touchStartX = 0,
      touchEndX = 0,
      touchStartY = 0,
      touchEndY = 0,
      mouseStartX = 0,
      mouseEndX = 0,
      currentPosition = -100,
      mouseGapThreshold = 100;

////  메인슬라이드 -  좌우도 이동

////  메인슬라이드 - 인덱스
function mainSlideControll(){
  const mainIdx = currentPosition/-100;
  const slideDot = $('.mainSlide-Controller div');
  const slideDotActive = $('.mainSlide-Controller div:nth-child(' + mainIdx  + ')');  
  slideDot.removeClass('active');
  slideDotActive.addClass('active');
}
mainSlideControll();


function nextSlide() {
  currentPosition -= 100;
  slideBox.animate({ left: currentPosition + "%" }, 400);
  if (currentPosition == -600) {
    slideBox.animate({ left: "-100%" }, 0);
    currentPosition = -100;
  } 
  mainSlideControll();
}

function prevSlide() {
  currentPosition += 100;
  slideBox.animate({ left: currentPosition + "%" }, 400);
  if (currentPosition == 0) {
    slideBox.animate({ left: "-500%" }, 0);
    currentPosition = -500;
  }
  mainSlideControll();
}

slideContainer.on("touchstart", function (event) {
  touchStartX = event.originalEvent.touches[0].clientX;
  touchStartY = event.originalEvent.touches[0].clientY;
});

slideContainer.on("touchend", function (event) {
  touchEndX = event.originalEvent.changedTouches[0].clientX;
  touchEndY = event.originalEvent.changedTouches[0].clientY;
  const swipeDistanceX = touchEndX - touchStartX;
  if (swipeDistanceX > swipeThresholdX) {
    prevSlide();
  } else if (swipeDistanceX < -swipeThresholdX) {
    nextSlide();
  }
});

function PC_slide(){
  let mouseGap = mouseEndX - mouseStartX;
  if(mouseGap > mouseGapThreshold){
    prevSlide();
  } else if(mouseGap < -mouseGapThreshold){
    nextSlide();
  }
}

slideContainer.on("mousedown", function(event){
  mouseStartX = event.clientX;  
});
slideContainer.on("mouseup", function(event){
  mouseEndX = event.clientX;  
  PC_slide();
});




//// --------------------------------  TICKET  & INFO  -------------------------------- ////
const ticketSection = $(".ticket"),
      ticket1 = ticketSection.find(".ticket1"),
      ticket3 = ticketSection.find(".ticket3");
      infoDivs = $('.info-menu > div'),
      infoContents = $('.info-menu i, .info-menu p');

$(window).scroll(function(){
  let SCT = $(window).scrollTop();
  // Ticket 회전
  if (SCT <= 100) {
    ticket1.add(ticket3).removeClass("TicketMoving");
  }
  if (SCT > 300 ) {
    setTimeout(function(){
      ticket1.addClass("TicketMoving");
    },100);
    setTimeout(function(){
      ticket3.addClass("TicketMoving");        
    }, 900);
  }
 
  // Info 메뉴 버튼 차례로 올라오기
  if (SCT > 800) {
    infoContents.each(function(idx){
      const element = $(this);
      setTimeout(function() {
        element.addClass('buttonUp');        
      }, idx * 220);
    });
  } else if(SCT < 300){
    infoContents.removeClass('buttonUp');
  }
});


//// ------------------------------------  PHOTO  ------------------------------------ ////
const photoSlideBox = $('.photoSlide-Container'),
      photoSlides = photoSlideBox.find('div'),
      totalPhotoSlides = photoSlides.length,
      PhotoSwipeThreshold = 30,
      photoSlideContainer = $('.photoSlide');
let currentIdx = 1;

// 포토 슬라이드 - 인덱스
function CurrentIdxControll(){
  const photoSlideDivs = $('.photoSlide-controller_index div');
  const photoSlideDiv = $('.photoSlide-controller_index div:nth-child(' + currentIdx + ')');
  photoSlideDivs.removeClass('active');
  photoSlideDiv.addClass('active');
}

// 터치 X값 따라 좌우 슬라이드
CurrentIdxControll();

function nextPhotoSlide() {
  currentIdx++;
  let currentLeftValue = currentIdx * -100 + '%';
  photoSlideBox.animate({ left: currentLeftValue }, 400);  
  if ( currentIdx == 6) {
    photoSlideBox.animate({ left: '-100%' }, 0);
    currentIdx = 1;
  }
  CurrentIdxControll();
}

function prevPhotoSlide() {
  currentIdx--;  
  let currentLeftValue = currentIdx * -100 + '%';
  photoSlideBox.animate({ left: currentLeftValue }, 400);  
  if ( currentIdx == 0) {
    photoSlideBox.animate({ left: '-500%' }, 0);
    currentIdx = 5;
  }
  CurrentIdxControll();
}

photoSlideContainer.on("touchstart", function (event) {
  touchStartX = event.originalEvent.touches[0].clientX;  
  touchStartY = event.originalEvent.touches[0].clientY;    
});

photoSlideContainer.on("touchend", function (event) {
  touchEndX = event.originalEvent.changedTouches[0].clientX;
  touchEndY = event.originalEvent.changedTouches[0].clientY;
  const swipeDistance = touchEndX - touchStartX;
  const touchDistanceY = touchEndY - touchStartY;
  const absTouchDistanceY = Math.floor(touchDistanceY);
  if (swipeDistance > PhotoSwipeThreshold) {
    prevPhotoSlide();
  } else if (swipeDistance < -PhotoSwipeThreshold) {
    nextPhotoSlide();
  }
});


let photo_mouseX;
let photo_mouseEndX;
let photo_mouseGap;
photoSlide_PC();
photoSlideContainer.on("mousedown", function(event){
  photo_mouseX = event.clientX;
});

photoSlideContainer.on("mouseup", function(event){
  photo_mouseEndX = event.clientX;  
  photo_mouseGap = photo_mouseEndX - photo_mouseX;
  photoSlide_PC();
});

function photoSlide_PC(){
  if(photo_mouseGap > mouseGapThreshold){
    prevPhotoSlide();
  } else if(photo_mouseGap < -mouseGapThreshold){
    nextPhotoSlide();
  }
}






//// --------------------------------  Footer  -------------------------------- ////
//  Top 버튼 누르면 0.5초 걸쳐서 위로 가기
$('.top').click(function() {
  $('html, body').animate({
    scrollTop: 0
  }, 500, 'easeInOutCubic');
});
