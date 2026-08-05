// document.getElementById('submit').addEventListener('click', function() {
//     document.getElementById('startform').style.display = 'none';
// });

document.getElementById('config').addEventListener('click', function() {
    document.getElementById('startform').style.display = 'grid';
});

document.getElementById('birthdayYes').addEventListener('change', function() {
    if (document.getElementById('birthdayYes').checked) {
        document.getElementById('birthdayStudentField').classList.remove('hidden');
        document.getElementById('birthdayStudent').required = true;
    }
});

document.getElementById('birthdayNo').addEventListener('change', function() {
    if (document.getElementById('birthdayNo').checked) {
        document.getElementById('birthdayStudentField').classList.add('hidden');
        document.getElementById('birthdayStudent').required = false;
    }
});

document.getElementById('startform').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('startform').style.display = 'none';

    const formData = new FormData(document.getElementById('teacher_setup'));
    const honorific = formData.get('honorific');
    const teacher_name = formData.get('teacher_name');
    const isBirthday = formData.get('birthday');
    const birthdayStudent = formData.get('birthdayStudent');

    console.log("Honorific:", honorific);
    console.log("Name:", teacher_name);
    console.log("Celebrating Birthday:", isBirthday);
    console.log("Birthday Student:", birthdayStudent);
});