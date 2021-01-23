import './styles/app.scss';
import './bootstrap';

function main(){

//timer do chowania powiadomień o edycji i usunięciu książki
const alert = document.getElementById('notice');
if (alert) setTimeout(() => alert.style.display = 'none', 2000);

//event handler dla 'submit' dla form_delete (pokaż confirmation box)
const deleteForms = document.getElementsByClassName('form-delete');
for (let form of deleteForms) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        let isAccepted = confirm("Czy na pewno chcesz usunąć tę pozycję?");
        if (isAccepted) form.submit();
        else return;
    })
}
}
main();
