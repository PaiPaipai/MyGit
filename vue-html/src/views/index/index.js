import 'swiper/dist/css/swiper.css';
import  './css/index.scss';
import $ from 'jquery'
import Swiper from 'swiper';

$(function(){
  var mySwiper = new Swiper('.swiper-container', {
    loop : true,
    autoplay: false,
  });
});