import $ from 'jquery';
import Alert from './alert';
const alertInstance = new Alert(document.querySelector('.alert')!);
$('.alert').alert('close');
$(document).on('click', '[data-dismiss="alert"]', function (e) {
  e.preventDefault();
  alertInstance.close(this);
});
