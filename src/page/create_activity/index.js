
const createButton = document.getElementById('createButton');
createButton.addEventListener('click', function () {
    const title = document.getElementById('activityTitle').value;
    const details = document.getElementById('activityDetail').value;
    localStorage.setItem('title', title);
    localStorage.setItem('details', details);
    console.log(title);
    console.log(details);
    window.location.href = '../add_award/index.html';


})
