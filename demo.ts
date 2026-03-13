import $ from 'jquery';
import './js/alert.js';
($('.alert') as any).alert('close');
declare global {
  interface JQuery {
    alert(config: 'close'): JQuery;
  }
}
$('.alert').alert('close');
